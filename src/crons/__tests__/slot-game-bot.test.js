import { stub } from "jest-micro-auto-stub";
import { Core } from "sc-game-base";
import { IdCountersConsumer } from "../../event-consumers";
import SlotGameBot from "../slot-game-bot";
import { helpers } from "sc-common";

// Mock helpers module
jest.mock("sc-common", () => ({
    helpers: {
        configHelper: {
            getMaxBotForCurrentHour: jest.fn().mockReturnValue(10),
        },
    },
}));

describe("SlotGameBot", () => {
    let bot;
    let dependencies;
    let mockGameData;
    let mockBotInfo;
    let mockDefinition;

    beforeEach(() => {
        mockGameData = createMockGameData();
        dependencies = createMockDependencies();
        mockBotInfo = createMockBotInfo();
        mockDefinition = {
            id: "test-game",
            configName: "test-config",
            jackpotSize: 6,
        };

        // Fix gameManagementApiClient mock with instance method
        const mockApiClient = {
            users: {
                getTotalBots: jest.fn().mockResolvedValue(100),
                getAllBots: jest.fn().mockResolvedValue([]),
            },
        };

        // Create factory with instance method
        dependencies.gameManagementApiClientFactory = {
            instance: jest.fn().mockReturnValue(mockApiClient),
            create: jest.fn().mockReturnValue(mockApiClient),
        };

        // Create fresh bot without calling resetAllBotData
        bot = new SlotGameBot({
            definition: mockDefinition,
            gameData: mockGameData,
            ...dependencies,
        });
        bot.gameManagementApiClient = mockApiClient;

        // Setup chance mock
        bot.chance = {
            shuffle: jest.fn((arr) => arr),
            pickone: jest.fn((arr) => arr[0]),
            weighted: jest.fn((arr) => arr[0]),
            natural: jest.fn(() => 0),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("Initialization", () => {
        it("should extend Core.Crons.BaseBot", () => {
            expect(bot instanceof Core.Crons.BaseBot).toBe(true);
        });

        it("should initialize with correct default paylines", () => {
            expect(bot.paylines).toEqual([0, 1, 2]);
        });

        it("should initialize with empty group tracks", () => {
            // Don't call resetAllBotData to test initial state
            expect(bot.groupTracks).toEqual([]);
        });
    });

    describe("resetBotJackpotGame", () => {
        it("should update bot list when bot ratio changes", async () => {
            // Arrange
            const expectedRatio = 10;
            helpers.configHelper.getMaxBotForCurrentHour.mockReturnValue(expectedRatio);
            dependencies.jackpotConfigsConsumer.getJackpotConfigById.mockReturnValue({
                operatorId: "testOp",
                siteNames: ["site1"],
                pools: { minor: { botSettings: { alloc: 80 } } },
            });

            // Act
            await bot.resetBotJackpotGame();

            // Assert
            expect(bot.currentBotRatio).toBe(expectedRatio);
        });

        it("should not update bot list when bot ratio remains same", async () => {
            // Arrange
            bot.currentBotRatio = 10;

            // Act
            await bot.resetBotJackpotGame();

            // Assert
            expect(dependencies.gameManagementApiClientFactory.create).not.toHaveBeenCalled();
        });

        it("should reset all bots when botenabled is false", async () => {
            // Arrange
            mockGameData.gameConfigs.botenabled = false;

            // Act
            await bot.resetBotJackpotGame();

            // Assert
            expect(bot.bots).toEqual([]);
        });
    });

    describe("standardizeBots", () => {
        beforeEach(() => {
            // Setup for standardizeBots tests
            helpers.configHelper.getMaxBotForCurrentHour.mockReturnValue(10);

            // Reset bot configs
            mockGameData.botConfigs = [
                {
                    jackpotConfigId: "config1",
                    maxBots: 10,
                },
            ];
        });

        it("should assign correct operator ID from jackpot config", () => {
            // Arrange
            const botInfo = [{ id: 1, name: "bot1" }];
            dependencies.jackpotConfigsConsumer.getJackpotConfigById.mockReturnValue({
                operatorId: "testOp",
                siteNames: ["site1"],
                pools: { minor: { botSettings: { alloc: 80 } } },
            });

            // Act
            const result = bot.standardizeBots(botInfo);

            // Assert
            expect(result[0].session.operatorId).toBe("testOp");
        });

        it("should handle empty site names in jackpot config", () => {
            // Arrange
            const botInfo = [{ id: 1, name: "bot1" }];
            dependencies.jackpotConfigsConsumer.getJackpotConfigById.mockReturnValue({
                operatorId: "testOp",
                siteNames: [],
                pools: { minor: { botSettings: { alloc: 80 } } },
            });

            // Act
            const result = bot.standardizeBots(botInfo);

            // Assert
            expect(result[0].session.siteName).toBe("");
        });
    });

    describe("placeBet", () => {
        beforeEach(() => {
            // Setup for placeBet tests
            bot.groupTracks = {
                config1: [
                    {
                        betLevels: [1],
                        ratio: 50,
                        numberOfTickets: 0,
                    },
                ],
            };

            const mockJackpotConfig = {
                enabled: true,
                _id: "config1",
                pools: {
                    minor: { botSettings: { alloc: 80, contrib: 0.01 } },
                    major: { botSettings: { alloc: 15, contrib: 0.015 } },
                    grand: { botSettings: { alloc: 5, contrib: 0.025 } },
                },
            };
            dependencies.jackpotConfigsConsumer.getJackpotConfig.mockReturnValue(mockJackpotConfig);

            // Setup for big win test
            dependencies.paylineCalculator.calculate.mockReturnValue({
                paylines: [{ odds: 10, payline: 0 }], // High odds to trigger big win
                jackpotPayline: -1,
            });
        });

        it("should increase round ID before placing bet", async () => {
            // Arrange
            const initialRoundId = mockGameData.roundId;

            // Act
            await bot.placeBet(mockBotInfo);

            // Assert
            expect(mockGameData.roundId).toBe(initialRoundId + 1);
        });

        it("should skip bet if jackpot is not enabled", async () => {
            // Arrange
            dependencies.jackpotConfigsConsumer.getJackpotConfig.mockReturnValue({
                enabled: false,
            });

            // Act
            await bot.placeBet(mockBotInfo);

            // Assert
            expect(dependencies.boardGenerator.generateForBots).not.toHaveBeenCalled();
        });

        it("should calculate correct contribution rate", async () => {
            // Act
            await bot.placeBet(mockBotInfo);

            // Assert
            expect(dependencies.jackpotConsumer.contribute).toHaveBeenCalledWith(
                mockBotInfo,
                expect.objectContaining({
                    rate: 1,
                    contributedByMember: false,
                })
            );
        });

        it("should record big win when win amount exceeds threshold", async () => {
            // Arrange
            const betAmount = 1;
            const numberOfPaylines = 3;
            const odds = 10;
            const winAmount = betAmount * odds;
            const totalAmount = betAmount * numberOfPaylines;

            // Act
            await bot.placeBet(mockBotInfo);

            // Assert
            expect(dependencies.hallOfFameConsumer.add).toHaveBeenCalledWith(
                mockBotInfo,
                expect.objectContaining({
                    roundId: mockGameData.roundId,
                    bet: betAmount,
                    totalAmount: totalAmount,
                    winningAmount: winAmount,
                    numberOfPaylines: numberOfPaylines,
                    rate: 1,
                })
            );
        });
    });
});

function createMockDependencies() {
    return {
        idCountersConsumer: stub(IdCountersConsumer),
        boardCheatingConsumer: {
            consume: jest.fn().mockImplementation((name, board) => board),
        },
        boardGenerator: {
            generateForBots: jest.fn().mockReturnValue([
                ["A", "B"],
                ["C", "D"],
            ]),
            numberOfPaylines: 3,
        },
        paylineCalculator: {
            calculate: jest.fn().mockReturnValue({
                paylines: [{ odds: 1, payline: 0 }],
                jackpotPayline: -1,
            }),
        },
        hallOfFameConsumer: {
            add: jest.fn().mockResolvedValue({}),
        },
        jackpotConsumer: {
            contribute: jest.fn().mockResolvedValue({}),
            hit: jest.fn().mockResolvedValue({
                amount: 1000,
                prize: "minor",
            }),
        },
        jackpotConfigsConsumer: {
            getJackpotConfig: jest.fn(),
            getJackpotConfigById: jest.fn(),
        },
        tmpRoundsRepository: {
            create: jest.fn(),
        },
    };
}

function createMockGameData() {
    return {
        gameConfigs: {
            slotsConfig: {
                jackpot: {
                    enabled: true,
                    pools: {
                        minor: { botSettings: { contrib: 0.01, alloc: 80 } },
                        major: { botSettings: { contrib: 0.015, alloc: 15 } },
                        grand: { botSettings: { contrib: 0.025, alloc: 5 } },
                    },
                },
                bigWinRatio: 3,
            },
            botenabled: true,
        },
        botConfigs: [
            {
                jackpotConfigId: "config1",
                maxBots: 10,
            },
        ],
        exchangeRates: { exId: 1 },
        roundId: 100,
        jackpotConfigs: [
            {
                _id: "config1",
                botBetLevels: [1],
                operatorId: "op1",
                siteNames: ["site1"],
                pools: {
                    minor: { botSettings: { contrib: 0.01, alloc: 80 } },
                    major: { botSettings: { contrib: 0.015, alloc: 15 } },
                    grand: { botSettings: { contrib: 0.025, alloc: 5 } },
                },
            },
        ],
    };
}

function createMockBotInfo() {
    return {
        id: 1,
        UID: "bot1",
        profile: {
            name: "TestBot",
        },
        session: {
            operatorId: "op1",
            siteName: "site1",
        },
    };
}
