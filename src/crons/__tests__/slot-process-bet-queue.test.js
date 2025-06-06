import { stub } from "jest-micro-auto-stub";
import math from "lodash/math";
import { Core } from "sc-game-base";
import GameManagementApiClientFactory from "sc-game-base/src/core/game-management-api";
import JackpotValidator from "../../validators/jackpot-validator";
import SlotProcessBetQueue from "../slot-process-bet-queue";

describe("SlotProcessBetQueue", () => {
    let cron;
    let dependencies;
    let mockGameData;
    let mockPlayer;
    let mockDefinition;
    let mockJackpotConfigsConsumer;

    // Common setup
    beforeEach(() => {
        // Setup mock jackpot configs consumer
        mockJackpotConfigsConsumer = {
            getJackpotConfig: jest.fn().mockReturnValue({
                pools: {
                    minor: { playerSettings: { contrib: 0.1 } },
                    major: { playerSettings: { contrib: 0.15 } },
                    grand: { playerSettings: { contrib: 0.25 } },
                },
                excludeTestCurrency: false,
            }),
        };

        // Setup mock game data with currencies
        mockGameData = {
            roundId: 1,
            exchangeRates: { code: [], exId: "ex1" },
            gameConfigs: {
                slotsConfig: {
                    jackpot: {
                        enabled: false,
                    },
                },
            },
            ingame: {},
            currencies: [
                { name: "USD", isTest: false },
                { name: "TEST", isTest: true },
            ],
        };

        // Setup mock player
        mockPlayer = {
            UID: "player1",
            profile: { name: "Player 1" },
            session: {
                playerId: "pid1",
                siteId: "site1",
                currencyName: "USD",
                operatorId: "op1",
                siteName: "site1",
                disabledJackpotGames: false,
            },
        };

        // Setup mock definition
        mockDefinition = {
            id: "test-game",
            name: "Test Game",
        };

        // Create jackpot validator with proper consumer
        const jackpotValidator = new JackpotValidator(mockGameData);
        jackpotValidator.jackpotConfigsConsumer = mockJackpotConfigsConsumer;

        // Setup dependencies
        dependencies = {
            gameManagementApiClientFactory: stub(GameManagementApiClientFactory),
            placeBetPublisher: {
                publishGameFailedBet: jest.fn(),
                publishSuccessBet: jest.fn(),
            },
            freeSpinsConsumer: {
                getSoonestExpiredFreeSpinSet: jest.fn(),
                useFreeSpin: jest.fn(),
            },
            settleGameRoundConsumer: {
                settleRound: jest.fn(),
            },
            roundsRepository: {
                create: jest.fn(),
            },
            idCountersConsumer: {
                consume: jest.fn(),
            },
            jackpotValidator,
            jackpotConfigsConsumer: mockJackpotConfigsConsumer,
            logService: {
                log: jest.fn(),
                error: jest.fn(),
            },
            baseMetrics: {
                collectBetProcessedTime: jest.fn(),
            },
            placeBet: jest.fn().mockResolvedValue({
                response: { balance: { credits: 100 } },
                apiError: null,
            }),
        };

        // Create cron instance
        cron = new SlotProcessBetQueue({
            definition: mockDefinition,
            gameData: mockGameData,
            ...dependencies,
        });

        // Mock base class methods
        cron.calculateCurrencyRate = jest.fn().mockReturnValue(1);
        cron.notifyPlacingBetResult = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("Class Inheritance", () => {
        it("should extend Core.Crons.ProcessBetQueue", () => {
            expect(cron instanceof Core.Crons.ProcessBetQueue).toBe(true);
        });
    });

    describe("proceedBet", () => {
        describe("when round is finished", () => {
            beforeEach(() => {
                mockGameData.ingame[mockPlayer.profile.name] = { finish: true };
            });

            it("should publish game failed bet with cannotPlaceBet notice", async () => {
                await cron.proceedBet(mockPlayer, {});

                expect(dependencies.placeBetPublisher.publishGameFailedBet).toHaveBeenCalledWith(
                    mockPlayer.UID,
                    expect.objectContaining({
                        endBet: -1,
                        notice: expect.objectContaining({
                            errorCode: expect.any(String),
                        }),
                    })
                );
            });
        });

        describe("when using free spins", () => {
            it("should fail if no free spin set is available", async () => {
                const payload = { freeSpin: true };
                dependencies.freeSpinsConsumer.getSoonestExpiredFreeSpinSet.mockReturnValue(null);

                await cron.proceedBet(mockPlayer, payload);

                expect(dependencies.placeBetPublisher.publishGameFailedBet).toHaveBeenCalledWith(
                    mockPlayer.UID,
                    expect.objectContaining({
                        endBet: -1,
                        notice: expect.any(Object),
                    })
                );
            });

            it("should use free spin set values when available", async () => {
                const freeSpinSet = {
                    bet: 1,
                    paylines: [1, 2, 3],
                };
                dependencies.freeSpinsConsumer.getSoonestExpiredFreeSpinSet.mockReturnValue(freeSpinSet);
                dependencies.jackpotValidator.canContributeJackpotPools = jest.fn().mockReturnValue(false);

                const payload = {
                    freeSpin: true,
                    amount: 1,
                    betChoice: [1, 2, 3],
                };
                await cron.proceedBet(mockPlayer, payload);

                expect(dependencies.idCountersConsumer.consume).toHaveBeenCalledWith("round");
                expect(dependencies.placeBet).toHaveBeenCalled();
            });
        });
    });

    describe("generateBetInfo", () => {
        describe("with normal bet", () => {
            it("should calculate total amount correctly", async () => {
                const payload = {
                    amount: 0.1,
                    betChoice: [1, 2, 3],
                    freeSpin: false,
                };

                const result = await cron.generateBetInfo(payload, null, mockPlayer);

                expect(result.totalAmount).toBe(math.round(payload.amount * payload.betChoice.length, 2));
            });

            it("should set contribution rate to 0 when jackpot is disabled", async () => {
                // Ensure jackpot is disabled
                mockGameData.gameConfigs.slotsConfig.jackpot.enabled = false;
                // Mock validator to return false for canContributeJackpotPools
                dependencies.jackpotValidator.canContributeJackpotPools = jest.fn().mockReturnValue(false);

                const payload = {
                    amount: 0.1,
                    betChoice: [1, 2, 3],
                    freeSpin: false,
                };

                const result = await cron.generateBetInfo(payload, null, mockPlayer);

                expect(result.contributionRate).toBe(0);
                expect(result.contributionAmount).toBe(0);
            });

            it("should calculate contribution rate when jackpot is enabled", async () => {
                // Enable jackpot
                mockGameData.gameConfigs.slotsConfig.jackpot.enabled = true;
                // Mock validator to return true for canContributeJackpotPools
                dependencies.jackpotValidator.canContributeJackpotPools = jest.fn().mockReturnValue(true);

                const payload = {
                    amount: 0.1,
                    betChoice: [1, 2, 3],
                    freeSpin: false,
                };

                const result = await cron.generateBetInfo(payload, null, mockPlayer);

                expect(result.contributionRate).toBe(0.5); // 0.1 + 0.15 + 0.25
                expect(result.contributionAmount).toBe(math.round(result.totalAmount * 0.5, 4));
            });
        });

        describe("with free spins", () => {
            const freeSpinSet = {
                bet: 2,
                paylines: [1, 2],
            };

            beforeEach(() => {
                dependencies.freeSpinsConsumer.getSoonestExpiredFreeSpinSet.mockReturnValue(freeSpinSet);
            });

            it("should use free spin set bet amount", async () => {
                const payload = { freeSpin: true };

                const result = await cron.generateBetInfo(payload, freeSpinSet, mockPlayer);

                expect(result.amount).toBe(freeSpinSet.bet);
            });

            it("should use free spin set paylines", async () => {
                const payload = { freeSpin: true };

                const result = await cron.generateBetInfo(payload, freeSpinSet, mockPlayer);

                expect(result.betChoice).toEqual(freeSpinSet.paylines);
            });

            it("should set contribution rate to 0 for free spins", async () => {
                const payload = { freeSpin: true };

                const result = await cron.generateBetInfo(payload, freeSpinSet, mockPlayer);

                expect(result.contributionRate).toBe(0);
            });
        });
    });

    describe("handleSuccessBet", () => {
        it("should call settleGameRoundConsumer with correct parameters", async () => {
            const balance = { credits: 100 };
            const bet = {
                totalAmount: 10,
                freeSpin: false,
                amount: 1,
                betChoice: [1, 2],
            };
            const roundId = 1;

            await cron.handleSuccessBet(mockPlayer, balance, roundId, bet);

            expect(dependencies.settleGameRoundConsumer.settleRound).toHaveBeenCalledWith(mockPlayer, roundId);
        });

        it("should use free spin when bet is a free spin", async () => {
            const balance = { credits: 100 };
            const bet = {
                totalAmount: 10,
                freeSpin: true,
                amount: 1,
                betChoice: [1, 2],
            };
            const roundId = 1;

            await cron.handleSuccessBet(mockPlayer, balance, roundId, bet);

            expect(dependencies.freeSpinsConsumer.useFreeSpin).toHaveBeenCalledWith(mockPlayer);
        });

        it("should create bet record with correct data", async () => {
            const balance = { credits: 100 };
            const bet = {
                totalAmount: 10,
                freeSpin: false,
                amount: 1,
                betChoice: [1, 2],
                contributionRate: 0.5,
            };
            const roundId = 1;

            await cron.handleSuccessBet(mockPlayer, balance, roundId, bet);

            expect(dependencies.roundsRepository.create).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: roundId,
                    uid: mockPlayer.UID,
                    name: mockPlayer.profile.name,
                    freeSpin: false,
                    bet: bet.amount,
                    totalAmount: bet.totalAmount,
                    paylines: bet.betChoice,
                    currency: mockPlayer.session.currencyName,
                    operatorId: mockPlayer.session.operatorId,
                    playerId: mockPlayer.session.playerId,
                    siteName: mockPlayer.session.siteName,
                })
            );
        });
    });
});
