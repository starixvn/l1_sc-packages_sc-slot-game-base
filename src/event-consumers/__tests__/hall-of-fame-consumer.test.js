import { stubMongoose } from "jest-micro-auto-stub";
import mongoose from "mongoose";

import { HallOfFameConsumer } from "..";

describe("HallOfFameConsumer", () => {
    let consumer;
    let famesRepository;
    let mockGameData;
    let mockPlayer;

    beforeEach(() => {
        // Arrange - Common test setup
        famesRepository = stubMongoose(mongoose.Model);
        famesRepository.create = jest.fn();

        mockGameData = {
            exchangeRates: {
                exId: "ex1",
                code: { USD: 1, EUR: 0.85 },
            },
        };

        mockPlayer = {
            UID: "test-uid",
            profile: { name: "Test Player" },
            session: {
                playerId: "pid1",
                currencyName: "USD",
                operatorId: "op1",
                siteName: "site1",
            },
        };

        consumer = new HallOfFameConsumer(famesRepository, mockGameData);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("add", () => {
        describe("with player session", () => {
            it("should create fame record with basic bet info", async () => {
                // Arrange
                const fameData = {
                    roundId: 1,
                    bet: 5,
                    totalAmount: 25,
                    baseTotalAmount: 25,
                    winningAmount: 100,
                    baseWinningAmount: 100,
                    numberOfPaylines: 5,
                    freeSpin: false,
                    rate: 1,
                };

                // Act
                await consumer.add(mockPlayer, fameData);

                // Assert
                expect(famesRepository.create).toHaveBeenCalledWith(
                    expect.objectContaining({
                        uid: mockPlayer.UID,
                        name: mockPlayer.profile.name,
                        roundId: fameData.roundId,
                        bet: fameData.bet,
                        totalAmount: fameData.totalAmount,
                        baseTotalAmount: fameData.baseTotalAmount,
                        winningAmount: fameData.winningAmount,
                        baseWinningAmount: fameData.baseWinningAmount,
                        numberOfPaylines: fameData.numberOfPaylines,
                        freeSpin: fameData.freeSpin,
                        rate: fameData.rate,
                    })
                );
            });

            it("should include session information in fame record", async () => {
                // Arrange
                const fameData = {
                    roundId: 1,
                    bet: 5,
                    totalAmount: 25,
                    winningAmount: 100,
                    numberOfPaylines: 5,
                    freeSpin: false,
                    rate: 1,
                };

                // Act
                await consumer.add(mockPlayer, fameData);

                // Assert
                expect(famesRepository.create).toHaveBeenCalledWith(
                    expect.objectContaining({
                        currency: mockPlayer.session.currencyName,
                        operatorId: mockPlayer.session.operatorId,
                        playerId: mockPlayer.session.playerId,
                        siteName: mockPlayer.session.siteName,
                    })
                );
            });

            it("should include exchange rate information", async () => {
                // Arrange
                const fameData = {
                    roundId: 1,
                    bet: 5,
                    totalAmount: 25,
                    winningAmount: 100,
                    numberOfPaylines: 5,
                    freeSpin: false,
                    rate: 1,
                };

                // Act
                await consumer.add(mockPlayer, fameData);

                // Assert
                expect(famesRepository.create).toHaveBeenCalledWith(
                    expect.objectContaining({
                        exchangeRateId: mockGameData.exchangeRates.exId,
                        rate: fameData.rate,
                    })
                );
            });

            it("should set current time as fame record time", async () => {
                // Arrange
                const fameData = {
                    roundId: 1,
                    bet: 5,
                    totalAmount: 25,
                    winningAmount: 100,
                    numberOfPaylines: 5,
                };
                const beforeTest = new Date();

                // Act
                await consumer.add(mockPlayer, fameData);

                // Assert
                expect(famesRepository.create).toHaveBeenCalledWith(
                    expect.objectContaining({
                        time: expect.any(Date),
                    })
                );
                const createdTime = famesRepository.create.mock.calls[0][0].time;
                expect(createdTime.getTime()).toBeGreaterThanOrEqual(beforeTest.getTime());
                expect(createdTime.getTime()).toBeLessThanOrEqual(new Date().getTime());
            });
        });

        describe("without player session", () => {
            beforeEach(() => {
                // Arrange - Override mockPlayer for this test suite
                mockPlayer.session = null;
            });

            it("should create fame record without session information", async () => {
                // Arrange
                const fameData = {
                    roundId: 1,
                    bet: 5,
                    totalAmount: 25,
                    winningAmount: 100,
                    numberOfPaylines: 5,
                    rate: 1,
                };

                // Act
                await consumer.add(mockPlayer, fameData);

                // Assert
                const createdFame = famesRepository.create.mock.calls[0][0];
                expect(createdFame.currency).toBeUndefined();
                expect(createdFame.operatorId).toBeUndefined();
                expect(createdFame.playerId).toBeUndefined();
                expect(createdFame.siteName).toBeUndefined();
            });
        });

        describe("with free spins", () => {
            it("should set freeSpin flag to true when specified", async () => {
                // Arrange
                const fameData = {
                    roundId: 1,
                    bet: 5,
                    totalAmount: 25,
                    winningAmount: 100,
                    numberOfPaylines: 5,
                    freeSpin: true,
                    rate: 1,
                };

                // Act
                await consumer.add(mockPlayer, fameData);

                // Assert
                expect(famesRepository.create).toHaveBeenCalledWith(
                    expect.objectContaining({
                        freeSpin: true,
                    })
                );
            });
        });
    });
});
