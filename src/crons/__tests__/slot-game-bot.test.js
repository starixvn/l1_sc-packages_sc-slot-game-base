import { stub } from "jest-micro-auto-stub";
import { Core } from "sc-game-base";
import GameManagementApiClientFactory from "sc-game-base/src/core/game-management-api";
import { IdCountersConsumer } from "../../event-consumers";
import SlotGameBot from "../slot-game-bot";
import * as helpers from "../../helpers";

// Mock helpers.configHelper
jest.mock("../../helpers", () => ({
    configHelper: {
        getMaxBotForCurrentHour: jest.fn().mockReturnValue(10),
    },
}));

describe("SlotGameBot", () => {
    let bot;
    let dependencies;
    let mockGameData;
    let mockBotInfo;

    beforeEach(() => {
        mockGameData = createMockGameData();
        dependencies = createMockDependencies();
        mockBotInfo = createMockBotInfo();

        // Ensure configHelper returns number
        helpers.configHelper.getMaxBotForCurrentHour.mockReturnValue(10);

        bot = new SlotGameBot({
            gameData: mockGameData,
            ...dependencies,
        });

        // Common test setup
        bot.resetAllBotData();
        bot.adjustGroupTracks = jest.fn();
        bot.getBetAmount = jest.fn().mockReturnValue(1);
        bot.botRate = 1; // Set bot rate for calculations
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should extend Core.Crons.BaseBot", () => {
        expect(bot instanceof Core.Crons.BaseBot).toBe(true);
    });

    describe("standardizeBots", () => {
        it("should map bot info to standardized format", () => {
            // Arrange
            const botInfo = [{ id: 1, name: "bot1" }];
            const mockJackpotConfig = {
                operatorId: "op1",
                siteNames: ["site1"],
                pools: {
                    minor: { botSettings: { alloc: 80 } },
                },
            };

            // Mock with numeric weights
            mockGameData.botConfigs = [
                {
                    jackpotConfigId: "config1",
                    maxBots: 10, // Simplified to number
                },
            ];

            dependencies.jackpotConfigsConsumer.getJackpotConfigById.mockReturnValue(mockJackpotConfig);

            // Act
            const result = bot.standardizeBots(botInfo);

            // Assert
            expect(result).toEqual([
                {
                    UID: 1,
                    profile: { name: "bot1" },
                    session: expect.objectContaining({
                        operatorId: "op1",
                        siteName: expect.any(String),
                    }),
                },
            ]);
        });

        it("should assign jackpot config based on weights", () => {
            // Arrange
            const botInfo = [{ id: 1, name: "bot1" }];
            const mockJackpotConfig = {
                operatorId: "op1",
                siteNames: ["site1"],
                pools: {
                    minor: { botSettings: { alloc: 80 } },
                },
            };
            dependencies.jackpotConfigsConsumer.getJackpotConfigById.mockReturnValue(mockJackpotConfig);

            // Mock configHelper to return numeric weight
            helpers.configHelper.getMaxBotForCurrentHour.mockReturnValue(10);

            // Act
            const result = bot.standardizeBots(botInfo);

            // Assert
            expect(result[0].session).toEqual(
                expect.objectContaining({
                    operatorId: "op1",
                    siteName: expect.any(String),
                })
            );
        });
    });

    describe("placeBet", () => {
        beforeEach(() => {
            // Setup group tracks
            bot.groupTracks = {
                config1: [
                    {
                        betLevels: [1],
                        ratio: 50,
                        numberOfTickets: 0,
                    },
                ],
            };

            // Setup jackpot config
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

            // Setup payline calculator for big win
            dependencies.paylineCalculator.calculate.mockReturnValue({
                paylines: [{ odds: 4, payline: 0 }],
                jackpotPayline: -1,
            });

            // Ensure proper game data setup
            mockGameData.gameConfigs.slotsConfig.bigWinRatio = 3;
            bot.bigWinRatio = 3;
            bot.paylines = [0, 1, 2]; // Set paylines explicitly
        });

        describe("board generation", () => {
            it("should generate board with correct jackpot ratio", async () => {
                // Act
                await bot.placeBet(mockBotInfo);

                // Assert
                expect(dependencies.boardGenerator.generateForBots).toHaveBeenCalledWith(true, 50);
            });

            it("should apply board cheating", async () => {
                // Arrange
                const generatedBoard = [
                    ["A", "B"],
                    ["C", "D"],
                ];
                dependencies.boardGenerator.generateForBots.mockReturnValue(generatedBoard);

                // Act
                await bot.placeBet(mockBotInfo);

                // Assert
                expect(dependencies.boardCheatingConsumer.consume).toHaveBeenCalledWith(mockBotInfo.profile.name, generatedBoard);
            });
        });

        describe("big win handling", () => {
            it("should record big win when exceeding ratio", async () => {
                // Act
                await bot.placeBet(mockBotInfo);

                // Assert
                expect(dependencies.hallOfFameConsumer.add).toHaveBeenCalledWith(
                    mockBotInfo,
                    expect.objectContaining({
                        roundId: mockGameData.roundId,
                        bet: 1,
                        totalAmount: 3, // 1 bet * 3 paylines
                        winningAmount: 4, // odds * bet amount
                        numberOfPaylines: 3,
                        rate: 1,
                    })
                );
            });
        });
    });
});

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
                maxBots: 10, // Simplified to number
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
        gameManagementApiClientFactory: stub(GameManagementApiClientFactory),
        jackpotConfigsConsumer: {
            getJackpotConfig: jest.fn(),
            getJackpotConfigById: jest.fn(),
        },
        tmpRoundsRepository: {
            create: jest.fn(),
        },
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
