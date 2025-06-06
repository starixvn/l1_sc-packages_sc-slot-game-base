import { stub, stubMongoose } from "jest-micro-auto-stub";
import mongoose from "mongoose";
import { Core } from "sc-game-base";
import { JackpotGameConsumer } from "../../event-consumers";
import SlotGameCron from "../slot-game-cron";

describe("SlotGameCron", () => {
    let cron;
    let dependencies;
    let gameData;
    let definition;
    let mockApiClient;

    // Setup repositories
    const repositories = {
        roundsRepository: stubMongoose(mongoose.Model),
        exchangeRatesRepository: stubMongoose(mongoose.Model),
        currencyGroupGamesRepository: stubMongoose(mongoose.Model),
        partnerConfigRepository: stubMongoose(mongoose.Model),
        currencyGroupRepository: stubMongoose(mongoose.Model),
        currencyRepository: stubMongoose(mongoose.Model),
    };

    beforeEach(() => {
        // Setup mock API client
        mockApiClient = {
            archiveStatus: {
                getArchiveStatus: jest.fn().mockResolvedValue({ isSuccessful: true, data: {} }),
            },
            aggregation: {
                getSettingForNewRound: jest.fn().mockResolvedValue({ isSuccessful: true, data: {} }),
            },
            exchangeRates: {
                getExchangeRates: jest.fn().mockResolvedValue({ isSuccessful: true, data: [] }),
            },
            botConfig: {
                getBotConfig: jest.fn().mockResolvedValue({ isSuccessful: true, data: [] }),
            },
            jackpotConfig: {
                getJackpotConfig: jest.fn().mockResolvedValue({ isSuccessful: true, data: [] }),
            },
        };

        // Fix roundsRepository mock setup
        const mockFind = jest.fn().mockReturnValue({
            lean: jest.fn().mockReturnValue({
                exec: jest.fn().mockResolvedValue([]),
            }),
        });

        repositories.roundsRepository = {
            find: mockFind,
        };

        // Setup dependencies
        dependencies = {
            ...repositories,
            jackpotGameConsumer: stub(JackpotGameConsumer),
            gameManagementApiClientFactory: {
                instance: jest.fn().mockReturnValue(mockApiClient),
                create: jest.fn().mockReturnValue(mockApiClient),
            },
            idCountersConsumer: {
                getLatestId: jest.fn().mockResolvedValue(0),
                updateLatestId: jest.fn(),
            },
            logService: {
                logError: jest.fn(),
                log: jest.fn(),
            },
            bonusConsumer: {
                processExpiredBonus: jest.fn(),
            },
            freeSpinsConsumer: {
                reload: jest.fn(),
            },
            jackpotConsumer: {
                initialize: jest.fn(),
                getLatestRoundId: jest.fn().mockResolvedValue(0),
                getRunningPools: jest.fn().mockResolvedValue([]),
            },
            jackpotPublisher: {
                publishRunningPools: jest.fn(),
            },
            settleGameRoundConsumer: {
                consume: jest.fn(),
            },
            gameStatusPublisher: {
                publish: jest.fn(),
            },
            runningRoundInfoPublisher: {
                publish: jest.fn(),
            },
        };

        // Setup game data and definition
        gameData = {
            gameConfigs: {
                slotsConfig: {
                    jackpot: { enabled: false },
                },
            },
            remainingTime: 45,
        };

        definition = {
            id: "test-game",
            name: "Test Game",
            configName: "test-config",
            durations: {
                wholeRound: 45,
                placingBets: 30,
            },
            jackpotLiveSeconds: 30,
        };

        // Create cron instance
        cron = new SlotGameCron({
            gameData,
            definition,
            ...dependencies,
        });

        // Mock checkGameStatus to avoid base class issues
        cron.checkGameStatus = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("Initialization", () => {
        it("should extend Core.Crons.BaseGameCron", () => {
            expect(cron instanceof Core.Crons.BaseGameCron).toBe(true);
        });

        it("should initialize with correct dependencies", () => {
            expect(cron.freeSpinsConsumer).toBeDefined();
            expect(cron.bonusConsumer).toBeDefined();
            expect(cron.jackpotConsumer).toBeDefined();
        });
    });

    describe("start", () => {
        beforeEach(() => {
            // Fix archiveStatus mock for all start tests
            mockApiClient.archiveStatus.getArchiveStatus.mockResolvedValue({
                isSuccessful: true,
                data: {
                    lastArcId: {
                        _rounds: 0,
                        _freespins: 0,
                    },
                },
            });
        });

        it("should initialize roundId from idCountersConsumer", async () => {
            // Arrange
            const expectedRoundId = 100;
            dependencies.idCountersConsumer.getLatestId.mockResolvedValueOnce(expectedRoundId);

            // Act
            await cron.start();

            // Assert
            expect(cron.gameData.roundId).toBe(expectedRoundId);
        });

        it("should initialize freeSpinId from idCountersConsumer", async () => {
            // Arrange
            const expectedFreeSpinId = 50;
            dependencies.idCountersConsumer.getLatestId
                .mockResolvedValueOnce(0) // roundId
                .mockResolvedValueOnce(expectedFreeSpinId); // freeSpinId

            // Act
            await cron.start();

            // Assert
            expect(cron.gameData.freeSpinId).toBe(expectedFreeSpinId);
        });

        it("should process expired bonus rounds", async () => {
            // Act
            await cron.start();

            // Assert
            expect(dependencies.bonusConsumer.processExpiredBonus).toHaveBeenCalled();
        });

        it("should reload free spins", async () => {
            // Act
            await cron.start();

            // Assert
            expect(dependencies.freeSpinsConsumer.reload).toHaveBeenCalled();
        });
    });

    describe("proceed", () => {
        it("should decrease remaining time when game is not disabled", async () => {
            // Arrange
            const initialTime = 45;
            cron.gameData.remainingTime = initialTime;
            cron.gameData.disabled = false;

            // Act
            await cron.proceed();

            // Assert
            expect(cron.gameData.remainingTime).toBe(initialTime - 1);
        });

        it("should not decrease remaining time when game is disabled", async () => {
            // Arrange
            const initialTime = 45;
            cron.gameData.remainingTime = initialTime;
            cron.gameData.disabled = true;

            // Act
            await cron.proceed();

            // Assert
            expect(cron.gameData.remainingTime).toBe(initialTime);
        });

        it("should reset remaining time when it goes below zero", async () => {
            // Arrange
            cron.gameData.remainingTime = -1;

            // Act
            await cron.proceed();

            // Assert
            expect(cron.gameData.remainingTime).toBe(definition.durations.wholeRound);
        });

        it("should publish running pools every 5 ticks", async () => {
            // Arrange
            cron.gameData.remainingTime = 5 + 1;
            const mockPools = [{ id: 1, amount: 1000 }];
            dependencies.jackpotConsumer.getRunningPools.mockResolvedValue(mockPools);

            // Act
            await cron.proceed();

            // Assert
            expect(dependencies.jackpotPublisher.publishRunningPools).toHaveBeenCalledWith(
                mockPools.map((pool) => ({
                    gameId: definition.id,
                    ...pool,
                }))
            );
        });
    });

    describe("loadUnsettledBetsToIngame", () => {
        it("should load unsettled bets from repository", async () => {
            // Arrange
            const mockBets = [
                {
                    id: 1,
                    uid: "player1",
                    name: "Player 1",
                    result: [],
                    settlementResult: {},
                    time: new Date(),
                    playerId: "pid1",
                    currency: "USD",
                    operatorId: "op1",
                },
            ];
            repositories.roundsRepository.find().lean().exec.mockResolvedValueOnce(mockBets);

            // Act
            await cron.loadUnsettledBetsToIngame();

            // Assert
            expect(cron.gameData.ingame["Player 1"]).toBeDefined();
        });

        it("should map bonus chests correctly", async () => {
            // Arrange
            const mockBets = [
                {
                    id: 1,
                    uid: "player1",
                    name: "Player 1",
                    bonusChests: [{ picked: false }],
                    result: [],
                    settlementResult: {},
                    time: new Date(),
                    playerId: "pid1",
                    currency: "USD",
                    operatorId: "op1",
                },
            ];
            repositories.roundsRepository.find().lean().exec.mockResolvedValueOnce(mockBets);

            // Act
            await cron.loadUnsettledBetsToIngame();

            // Assert
            expect(cron.gameData.ingame["Player 1"].bonusChests).toEqual([{ picked: false }]);
        });
    });
});
