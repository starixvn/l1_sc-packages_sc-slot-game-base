import { stub, stubMongoose } from "jest-micro-auto-stub";
import mongoose from "mongoose";
import { logger } from "sc-common/logger";
import SlotGameData from "../../slot-game-data";
import SlotGameDefinition from "../../slot-game-definition";
import { jackpotPublisher, jackpotValidator } from "../__tests__/stubs";
import JackpotConsumer from "../jackpot-consumer";

const gameData = stubGameData();
const gameDefinition = stubGameDefinition();

/** @type {mongoose.Model}*/
const jackpotsRepository = stubMongoose(mongoose.Model);

const logService = stub(logger);
const jackpotConfigsConsumer = {
    getJackpotConfig: jest.fn(),
};

describe("JackpotConsumer", () => {
    let consumer;

    beforeEach(() => {
        consumer = initConsumer();
        jest.clearAllMocks();

        // Setup default mock responses
        jackpotConfigsConsumer.getJackpotConfig.mockReturnValue({
            _id: "config1",
            operatorId: "op1",
            winningRatio: 0.98,
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
        });
    });

    describe("contribute", () => {
        const pool = 1000;
        const player = {
            session: {
                operatorId: "op1",
                siteName: "site1",
            },
        };
        const bet = {
            pool,
            totalAmount: 5,
            roundId: gameData.roundId,
            rate: 1,
        };

        describe("when player can contribute", () => {
            beforeEach(() => {
                jackpotValidator.canContributeJackpotPools.mockReturnValueOnce(true);
                jackpotsRepository.findOneAndUpdate.mockReturnValue({
                    amount: 12,
                });
            });

            it("should call contributeToPool with correct base amount", async () => {
                // Arrange
                const spy = jest.spyOn(consumer, "contributeToPool");

                // Act
                await consumer.contribute(player, bet);

                // Assert
                expect(spy).toHaveBeenCalledWith(
                    expect.objectContaining({
                        baseTotalAmount: 5,
                    })
                );
            });

            it("should call contributeToPool with correct prize", async () => {
                // Arrange
                const spy = jest.spyOn(consumer, "contributeToPool");

                // Act
                await consumer.contribute(player, bet);

                // Assert
                expect(spy).toHaveBeenCalledWith(
                    expect.objectContaining({
                        prize: "minor",
                    })
                );
            });

            it("should call contributeToPool with correct roundId", async () => {
                // Arrange
                const spy = jest.spyOn(consumer, "contributeToPool");

                // Act
                await consumer.contribute(player, bet);

                // Assert
                expect(spy).toHaveBeenCalledWith(
                    expect.objectContaining({
                        roundId: gameData.roundId,
                    })
                );
            });

            it("should call contributeToPool for all configured prizes", async () => {
                // Arrange
                const spy = jest.spyOn(consumer, "contributeToPool");
                const expectedPrizes = ["minor", "major", "grand"];

                // Act
                await consumer.contribute(player, bet);

                // Assert
                expectedPrizes.forEach((prize) => {
                    expect(spy).toHaveBeenCalledWith(
                        expect.objectContaining({
                            prize,
                        })
                    );
                });
            });
        });

        describe("when player cannot contribute", () => {
            beforeEach(() => {
                jackpotValidator.canContributeJackpotPools.mockReturnValueOnce(false);
            });

            it("should not call contributeToPool", async () => {
                // Arrange
                const spy = jest.spyOn(consumer, "contributeToPool");

                // Act
                await consumer.contribute(player, bet);

                // Assert
                expect(spy).not.toHaveBeenCalled();
            });
        });
    });

    describe("calculatePoolAdjustment", () => {
        const poolConfig = {
            init: 5000,
            playerSettings: { contrib: 0.1, alloc: 90 },
            botSettings: { contrib: 0.01, alloc: 80 },
        };
        const baseTotalAmount = 5;

        describe("when contributed by real player", () => {
            it("should set byBots to zero", () => {
                // Act
                const adjustment = consumer.calculatePoolAdjustment({
                    contributedByMember: true,
                    poolConfig,
                    baseTotalAmount,
                });

                // Assert
                expect(adjustment.byBots).toBe(0);
            });

            it("should calculate byMembers using player contribution ratio", () => {
                // Arrange
                const expected = baseTotalAmount * poolConfig.playerSettings.contrib;

                // Act
                const adjustment = consumer.calculatePoolAdjustment({
                    contributedByMember: true,
                    poolConfig,
                    baseTotalAmount,
                });

                // Assert
                expect(adjustment.byMembers).toBe(expected);
            });

            it("should set total amount equal to byMembers", () => {
                // Arrange
                const expected = baseTotalAmount * poolConfig.playerSettings.contrib;

                // Act
                const adjustment = consumer.calculatePoolAdjustment({
                    contributedByMember: true,
                    poolConfig,
                    baseTotalAmount,
                });

                // Assert
                expect(adjustment.amount).toBe(expected);
            });
        });

        describe("when contributed by bot", () => {
            it("should set byMembers to zero", () => {
                // Act
                const adjustment = consumer.calculatePoolAdjustment({
                    contributedByMember: false,
                    poolConfig,
                    baseTotalAmount,
                });

                // Assert
                expect(adjustment.byMembers).toBe(0);
            });

            it("should calculate byBots using bot contribution ratio", () => {
                // Arrange
                const expected = baseTotalAmount * poolConfig.botSettings.contrib;

                // Act
                const adjustment = consumer.calculatePoolAdjustment({
                    contributedByMember: false,
                    poolConfig,
                    baseTotalAmount,
                });

                // Assert
                expect(adjustment.byBots).toBe(expected);
            });

            it("should set total amount equal to byBots", () => {
                // Arrange
                const expected = baseTotalAmount * poolConfig.botSettings.contrib;

                // Act
                const adjustment = consumer.calculatePoolAdjustment({
                    contributedByMember: false,
                    poolConfig,
                    baseTotalAmount,
                });

                // Assert
                expect(adjustment.amount).toBe(expected);
            });
        });
    });

    describe("contributeToPool", () => {
        const jackpotPrize = "minor";
        const poolConfig = {
            init: 5000,
            playerSettings: { contrib: 0.1, alloc: 90 },
            botSettings: { contrib: 0.01, alloc: 80 },
        };
        const betContribution = {
            baseTotalAmount: 5,
            contributedByMember: false,
            roundId: gameData.roundId,
            prize: jackpotPrize,
            jackpotConfig: {
                _id: "config1",
                operatorId: "op1",
                siteNames: ["site1"],
                pools: {
                    minor: poolConfig,
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
        };

        beforeEach(() => {
            jest.spyOn(consumer, "calculatePoolAdjustment").mockReturnValue({
                amount: 0.05,
                byBots: 0.05,
                byMembers: 0,
            });
            jackpotsRepository.findOneAndUpdate.mockReturnValue({
                amount: 12,
            });
        });

        it("should call calculatePoolAdjustment with correct parameters", async () => {
            // Act
            await consumer.contributeToPool(betContribution);

            // Assert
            expect(consumer.calculatePoolAdjustment).toHaveBeenCalledWith({
                baseTotalAmount: betContribution.baseTotalAmount,
                contributedByMember: betContribution.contributedByMember,
                poolConfig: betContribution.jackpotConfig.pools[jackpotPrize],
            });
        });

        it("should update repository with correct filter criteria", async () => {
            // Arrange
            const expectedFilter = {
                prize: jackpotPrize,
                winnerName: { $exists: false },
                createdAt: { $lte: gameData.roundId },
                jackpotConfigId: "config1",
            };

            // Act
            await consumer.contributeToPool(betContribution);

            // Assert
            expect(jackpotsRepository.findOneAndUpdate).toHaveBeenCalledWith(
                expect.objectContaining(expectedFilter),
                expect.objectContaining({
                    $inc: expect.any(Object),
                }),
                expect.any(Object)
            );
        });

        it("should publish latest pool amount after update", async () => {
            // Arrange
            const latestAmount = 12;
            jackpotsRepository.findOneAndUpdate.mockReturnValueOnce({
                amount: latestAmount,
            });

            // Act
            await consumer.contributeToPool(betContribution);

            // Assert
            expect(jackpotPublisher.publishLatestPool).toHaveBeenCalledWith(
                expect.objectContaining({
                    pool: jackpotPrize,
                    amount: latestAmount,
                }),
                expect.objectContaining({
                    operatorId: "op1",
                    siteNames: ["site1"],
                })
            );
        });
    });

    describe("hit", () => {
        const player = {
            UID: "uid",
            profile: { name: "A" },
            session: {
                playerId: 12,
                currencyGroupId: "617a650628b7a500016388f5",
                siteName: "site1",
            },
        };
        const bet = {
            prize: "minor",
            roundId: gameData.roundId,
            operatorId: "op1",
        };

        beforeEach(() => {
            jest.spyOn(consumer, "initializeNewPool");
            jackpotsRepository.findOneAndUpdate.mockReturnValue({
                amount: 12000,
                prize: "minor",
            });
        });

        it("should call repository to update jackpot", async () => {
            // Act
            await consumer.hit(player, bet);

            // Assert
            expect(jackpotsRepository.findOneAndUpdate).toHaveBeenCalledTimes(1);
        });

        it("should initialize new pool after hit", async () => {
            // Act
            await consumer.hit(player, bet);

            // Assert
            expect(consumer.initializeNewPool).toHaveBeenCalledWith(bet.prize, gameData.roundId, expect.any(Object));
        });

        describe("when jackpot exists", () => {
            const winningAmount = 12000;
            const winningRatio = 0.98;

            beforeEach(() => {
                jackpotsRepository.findOneAndUpdate.mockReturnValueOnce({
                    amount: winningAmount,
                    prize: "minor",
                });
            });

            it("should publish winner with correct amount", async () => {
                // Act
                await consumer.hit(player, bet);

                // Assert
                expect(jackpotPublisher.publishWinner).toHaveBeenCalledWith(
                    player.UID,
                    expect.objectContaining({
                        amount: winningAmount * winningRatio,
                        pool: bet.prize,
                    }),
                    expect.any(Object)
                );
            });

            it("should return jackpot with winning ratio applied", async () => {
                // Act
                const result = await consumer.hit(player, bet);

                // Assert
                expect(result.amount).toBe(winningAmount * winningRatio);
            });
        });

        describe("when jackpot does not exist", () => {
            beforeEach(() => {
                jackpotsRepository.findOneAndUpdate.mockReturnValueOnce(null);
            });

            it("should log critical error", async () => {
                // Act
                await consumer.hit(player, bet);

                // Assert
                expect(logService.logCritical).toHaveBeenCalledTimes(1);
            });

            it("should not publish winner", async () => {
                // Act
                await consumer.hit(player, bet);

                // Assert
                expect(jackpotPublisher.publishWinner).not.toHaveBeenCalled();
            });

            it("should return zero amount", async () => {
                // Act
                const result = await consumer.hit(player, bet);

                // Assert
                expect(result.amount).toBe(0);
            });
        });
    });

    describe("initialize", () => {
        describe("with valid pool configurations", () => {
            const mockJackpotConfig = {
                _id: "config1",
                pools: {
                    minor: { init: 5000 },
                    major: { init: 25000 },
                    grand: { init: 50000 },
                },
            };

            beforeEach(() => {
                consumer.gameData.jackpotConfigs = [mockJackpotConfig];
            });

            describe("when pools already exist", () => {
                beforeEach(() => {
                    jackpotsRepository.countDocuments.mockReturnValue({
                        exec: jest.fn().mockResolvedValue(2),
                    });
                });

                it("should log initialization status", async () => {
                    // Act
                    await consumer.initialize();

                    // Assert
                    expect(logService.logCritical).toHaveBeenCalledTimes(0);
                });

                it("should not initialize new pools", async () => {
                    // Arrange
                    const spy = jest.spyOn(consumer, "initializeNewPool");

                    // Act
                    await consumer.initialize();

                    // Assert
                    expect(spy).not.toHaveBeenCalled();
                });
            });

            describe("when pools do not exist", () => {
                beforeEach(() => {
                    jackpotsRepository.countDocuments.mockReturnValue({
                        exec: jest.fn().mockResolvedValue(0),
                    });
                    jackpotsRepository.create.mockResolvedValue({});
                });

                it("should initialize all configured pools", async () => {
                    // Arrange
                    const spy = jest.spyOn(consumer, "initializeNewPool");

                    // Act
                    await consumer.initialize();

                    // Assert
                    expect(spy).toHaveBeenCalledTimes(3);
                });
            });
        });

        describe("with invalid pool configurations", () => {
            beforeEach(() => {
                consumer.gameData.jackpotConfigs = null;
            });

            it("should log critical error", async () => {
                // Act
                await consumer.initialize();

                // Assert
                expect(logService.logCritical).toHaveBeenCalledTimes(1);
            });

            it("should not initialize any pools", async () => {
                // Arrange
                const spy = jest.spyOn(consumer, "initializeNewPool");

                // Act
                await consumer.initialize();

                // Assert
                expect(spy).not.toHaveBeenCalled();
            });
        });
    });

    describe("getLatestRoundId", () => {
        it("should return createdAt value from repository", async () => {
            // Arrange
            const expectedRoundId = 1;
            jackpotsRepository.findOne().lean().exec.mockResolvedValueOnce({
                createdAt: expectedRoundId,
            });

            // Act
            const roundId = await consumer.getLatestRoundId();

            // Assert
            expect(roundId).toBe(expectedRoundId);
        });

        it("should return 0 when no pools exist", async () => {
            // Arrange
            jackpotsRepository.findOne().lean().exec.mockResolvedValueOnce(null);

            // Act
            const roundId = await consumer.getLatestRoundId();

            // Assert
            expect(roundId).toBe(0);
        });
    });
});

// Helper functions
function initConsumer() {
    return new JackpotConsumer(gameDefinition, gameData, jackpotPublisher, logService, jackpotsRepository, jackpotValidator, jackpotConfigsConsumer);
}

function stubGameData() {
    const gameData = new SlotGameData();

    gameData.remainingTime = 20;
    gameData.gameConfigs = {
        enabled: true,
        minbet: 1,
        maxbet: 1000,
        slotsConfig: {
            betLevels: [0.1, 1, 5],
            jackpot: {
                enabled: true,
                excludeTestCurrency: false,
                winningRatio: 0.98,
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
                allowedCurrency: "INH",
            },
        },
    };
    gameData.freeSpinId = 1;
    gameData.exchangeRates = {
        code: [1],
    };

    gameData.currencyGroupGames = [
        {
            groupId: "617a650628b7a500016388f5",
            betLevels: [0.1, 1, 5],
        },
    ];

    return gameData;
}

function stubGameDefinition() {
    return new SlotGameDefinition({
        id: 2,
        name: "slot",
        choices: [1, 2, 3, 4, 5],
    });
}
