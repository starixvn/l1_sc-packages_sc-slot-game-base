import { stub, stubMongoose } from "jest-micro-auto-stub";
import mongoose from "mongoose";
import { BaseEventPublishers, RoundQuery } from "sc-game-base/src/core";

import GameManagementApiClientFactory from "sc-game-base/src/core/game-management-api";
import { FreeSpinsConsumer, InGameConsumer, JackpotConfigsConsumer } from "../";
import SlotGameData from "../../slot-game-data";
import SlotGameDefinition from "../../slot-game-definition";
import JackpotValidator from "../../validators/jackpot-validator";

describe("InGameConsumer", () => {
    // Common test dependencies
    let consumer;
    let gameData;
    let definition;
    let publisher;
    let roundQuery;
    let jackpotValidator;
    let freeSpinsConsumer;
    let jackpotConfigsConsumer;
    let userInfosRepository;
    let jackpotsRepository;
    let currencyGroupGamesRepository;
    let getBalance;
    let gameManagementApiClientFactory;

    // Common mock data
    const mockJackpotConfig = {
        _id: "config1",
        winningRatio: 0.98,
        pools: {
            minor: {
                init: 5000,
                playerSettings: { contrib: 0.1, alloc: 90 },
            },
            major: {
                init: 25000,
                playerSettings: { contrib: 0.15, alloc: 9 },
            },
            grand: {
                init: 50000,
                playerSettings: { contrib: 0.25, alloc: 1 },
            },
        },
    };

    beforeEach(() => {
        // Arrange - Setup common test dependencies
        userInfosRepository = stubMongoose(mongoose.Model);
        jackpotsRepository = stubMongoose(mongoose.Model);
        currencyGroupGamesRepository = stubMongoose(mongoose.Model);

        getBalance = jest.fn(() => ({ isOk: true, response: { red: 1000 } }));

        gameManagementApiClientFactory = stub(GameManagementApiClientFactory);
        gameManagementApiClientFactory.instance.mockReturnValue({
            users: {
                setBalance: jest.fn(() => ({ isSuccessful: true, data: {} })),
            },
        });

        gameData = stubGameData();
        definition = stubGameDefinition();
        publisher = stub(BaseEventPublishers);
        roundQuery = stub(RoundQuery);
        jackpotValidator = stub(JackpotValidator);
        freeSpinsConsumer = stub(FreeSpinsConsumer);
        jackpotConfigsConsumer = stub(JackpotConfigsConsumer);

        // Create consumer instance with dependencies
        consumer = new InGameConsumer({
            definition,
            gameData,
            roundQuery,
            publisher,
            freeSpinsConsumer,
            getBalance,
            userInfosRepository,
            jackpotsRepository,
            currencyGroupGamesRepository,
            jackpotValidator,
            gameManagementApiClientFactory,
            jackpotConfigsConsumer,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getPools", () => {
        it("should retrieve jackpot pools with correct format", async () => {
            // Arrange
            const expectedPools = [
                { pool: 1, amount: 1000, prize: "minor" },
                { pool: 5, amount: 10000, prize: "major" },
                { pool: 10, amount: 100000, prize: "grand" },
            ];
            const mockPlayer = {
                session: {
                    operatorId: "op1",
                    siteName: "site1",
                },
            };
            jackpotsRepository.find().lean().exec.mockReturnValueOnce(expectedPools);
            jackpotConfigsConsumer.getJackpotConfig.mockReturnValueOnce(mockJackpotConfig);

            // Act
            const pools = await consumer.getPools(mockPlayer);

            // Assert
            expect(pools).toStrictEqual(expectedPools);
            expect(jackpotsRepository.find).toHaveBeenCalledWith(
                expect.objectContaining({
                    winnerName: { $exists: false },
                    jackpotConfigId: mockJackpotConfig._id,
                }),
                expect.any(Object)
            );
        });
    });

    describe("buildPayload", () => {
        const defaultPlayer = {
            session: {
                currencyGroupId: "617a650628b7a500016388f5",
                currencyCode: "AUD",
                multiplier: 1000,
                operatorId: "op1",
                siteName: "site1",
            },
        };

        describe("jackpot access", () => {
            it("should not include jackpot pools when player cannot access jackpot", async () => {
                // Arrange
                jackpotValidator.canAccessJackpot.mockReturnValueOnce(false);
                const getPools = jest.spyOn(consumer, "getPools");

                // Act
                const payload = await consumer.buildPayload(defaultPlayer);

                // Assert
                expect(getPools).not.toHaveBeenCalled();
                expect(payload.jackpotPools).toHaveLength(0);
            });

            it("should include jackpot pools when player has access", async () => {
                // Arrange
                const expectedPools = [{ pool: 1, amount: 1000 }];

                // Mock in correct order - config first, then validator
                jackpotConfigsConsumer.getJackpotConfig
                    .mockReturnValueOnce(mockJackpotConfig) // First call from getSlotGameConfig
                    .mockReturnValueOnce(mockJackpotConfig); // Second call from getPools
                jackpotValidator.canAccessJackpot.mockReturnValueOnce(true);
                jackpotsRepository.find().lean().exec.mockReturnValueOnce(expectedPools);

                // Act
                const payload = await consumer.buildPayload(defaultPlayer);

                // Assert
                expect(payload.jackpotPools).toStrictEqual(expectedPools);
                expect(jackpotConfigsConsumer.getJackpotConfig).toHaveBeenCalledTimes(2);
                expect(jackpotConfigsConsumer.getJackpotConfig).toHaveBeenNthCalledWith(
                    1,
                    defaultPlayer.session.operatorId,
                    defaultPlayer.session.siteName
                );
                expect(jackpotConfigsConsumer.getJackpotConfig).toHaveBeenNthCalledWith(
                    2,
                    defaultPlayer.session.operatorId,
                    defaultPlayer.session.siteName
                );
                expect(payload.gameConfigs.jackpot).toEqual({
                    winningRatio: mockJackpotConfig.winningRatio,
                    pools: [
                        { pool: "minor", contribute: 0.1 },
                        { pool: "major", contribute: 0.15 },
                        { pool: "grand", contribute: 0.25 },
                    ],
                });
            });
        });

        describe("exchange rate", () => {
            it("should include correct exchange rate information", async () => {
                // Arrange
                const player = {
                    session: {
                        ...defaultPlayer.session,
                        currencyCode: "AUD",
                        multiplier: 1000,
                    },
                };

                // Act
                const { user } = await consumer.buildPayload(player);

                // Assert
                expect(user.rate).toBe(1000); // AUD rate (1) * multiplier (1000)
                expect(user.multiplier).toBe(1000);
            });
        });

        describe("jackpot game settings", () => {
            it("should include jackpot game settings from session", async () => {
                // Arrange
                const player = {
                    session: {
                        ...defaultPlayer.session,
                        disableJackpotGames: true,
                    },
                };

                // Act
                const { user } = await consumer.buildPayload(player);

                // Assert
                expect(user.disableJackpotGames).toBe(true);
            });
        });

        describe("free spins", () => {
            it("should include available free spins with correct format", async () => {
                // Arrange
                const expectedFreeSpins = {
                    total: 2,
                    bet: 1,
                    paylines: [1, 2, 3],
                };
                freeSpinsConsumer.getTotalAvaiableFreeSpins.mockReturnValueOnce(expectedFreeSpins.total);
                freeSpinsConsumer.getSoonestExpiredFreeSpinSet.mockReturnValueOnce({
                    bet: expectedFreeSpins.bet,
                    paylines: expectedFreeSpins.paylines,
                });

                // Act
                const payload = await consumer.buildPayload(defaultPlayer);

                // Assert
                expect(payload.freeSpins).toStrictEqual(expectedFreeSpins);
            });
        });
    });

    describe("getAvailableFreeSpins", () => {
        it("should return default structure when no free spins available", () => {
            // Arrange
            const expectedFreeSpins = {
                total: 0,
                bet: 0,
                paylines: [],
            };
            freeSpinsConsumer.getTotalAvaiableFreeSpins.mockReturnValueOnce(0);
            freeSpinsConsumer.getSoonestExpiredFreeSpinSet.mockReturnValueOnce(null);

            // Act
            const freeSpins = consumer.getAvailableFreeSpins({ session: {} });

            // Assert
            expect(freeSpins).toStrictEqual(expectedFreeSpins);
        });

        it("should return correct free spins data when available", () => {
            // Arrange
            const expectedFreeSpins = {
                total: 2,
                bet: 1,
                paylines: [1, 2, 3],
            };
            freeSpinsConsumer.getTotalAvaiableFreeSpins.mockReturnValueOnce(expectedFreeSpins.total);
            freeSpinsConsumer.getSoonestExpiredFreeSpinSet.mockReturnValueOnce({
                bet: expectedFreeSpins.bet,
                paylines: expectedFreeSpins.paylines,
            });

            // Act
            const freeSpins = consumer.getAvailableFreeSpins({ session: {} });

            // Assert
            expect(freeSpins).toStrictEqual(expectedFreeSpins);
        });
    });

    describe("getSlotGameConfig", () => {
        it("should return complete game configuration with jackpot settings when enabled", () => {
            // Arrange
            const player = {
                session: {
                    currencyGroupId: "617a650628b7a500016388f5",
                    currencyCode: "AUD",
                    multiplier: 1000,
                    operatorId: "op1",
                    siteName: "site1",
                },
            };
            const expected = {
                betLevels: [0.1, 1, 5],
                defaultBetLevel: 5,
                odds: [],
                jackpot: {
                    winningRatio: 0.98,
                    pools: [
                        { pool: "minor", contribute: 0.1 },
                        { pool: "major", contribute: 0.15 },
                        { pool: "grand", contribute: 0.25 },
                    ],
                },
            };

            jackpotConfigsConsumer.getJackpotConfig.mockReturnValueOnce({
                winningRatio: 0.98,
                pools: {
                    minor: {
                        init: 5000,
                        playerSettings: { contrib: 0.1, alloc: 90 },
                    },
                    major: {
                        init: 25000,
                        playerSettings: { contrib: 0.15, alloc: 9 },
                    },
                    grand: {
                        init: 50000,
                        playerSettings: { contrib: 0.25, alloc: 1 },
                    },
                },
            });

            // Act
            const slotConfig = consumer.getSlotGameConfig(player, true);

            // Assert
            expect(slotConfig).toStrictEqual(expected);
        });

        it("should return game configuration without jackpot settings when disabled", () => {
            // Arrange
            const player = {
                session: {
                    currencyGroupId: "617a650628b7a500016388f5",
                    currencyCode: "AUD",
                    multiplier: 1000,
                },
            };

            // Act
            const slotConfig = consumer.getSlotGameConfig(player, false);

            // Assert
            expect(slotConfig.jackpot).toStrictEqual({});
            expect(slotConfig.betLevels).toBeDefined();
            expect(slotConfig.defaultBetLevel).toBeDefined();
            expect(slotConfig.odds).toBeDefined();
        });
    });
});

// Helper functions for creating test data
function stubGameData() {
    const gameData = new SlotGameData();

    gameData.remainingTime = 20;
    gameData.gameConfigs = {
        enabled: true,
        minbet: 1,
        maxbet: 1000,
        slotsConfig: {
            betLevels: [0.1, 1, 5],
            icons: [],
            jackpot: {
                winningRatio: 0.98,
                enabled: true,
                pools: {
                    minor: {
                        init: 5000,
                        playerSettings: { contrib: 0.1, alloc: 90 },
                        botSettings: { contrib: 0.01, alloc: 80 },
                    },
                    major: {
                        init: 25000,
                        playerSettings: { contrib: 0.15, alloc: 9 },
                        botSettings: { contrib: 0.015, alloc: 15 },
                    },
                    grand: {
                        init: 50000,
                        playerSettings: { contrib: 0.25, alloc: 1 },
                        botSettings: { contrib: 0.025, alloc: 5 },
                    },
                },
            },
        },
    };

    gameData.currencyGroupGames = [{ groupId: "617a650628b7a500016388f5", betLevels: [0.1, 1, 5], defaultBetLevel: 5 }];
    gameData.exchangeRates = { code: { AUD: 1 } };

    return gameData;
}

function stubGameDefinition() {
    return new SlotGameDefinition({
        id: 1,
        choices: [1, 2, 3, 4, 5],
    });
}
