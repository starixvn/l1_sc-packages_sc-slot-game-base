import { stub, stubMongoose } from "jest-micro-auto-stub";
import mongoose from "mongoose";
import { GameManagementApiClientFactory } from "sc-game-base/src/core/game-management-api";
import { HallOfFameQuery } from "..";

describe("HallOfFameQuery", () => {
    let famesRepository;
    let jackpotsRepository;
    let gameManagementApiClientFactory;
    let gameManagementApiClient;
    let jackpotConfigsConsumer;
    let gameData;
    let fameQuery;

    beforeEach(() => {
        famesRepository = stubMongoose(mongoose.Model);
        jackpotsRepository = stubMongoose(mongoose.Model);
        gameManagementApiClient = {
            exchangeRates: {
                getExchangeRatesByExIds: jest.fn(() => ({ isSuccessful: true, data: [{ exId: 1, code: { US: 1 } }] })),
            },
        };
        gameManagementApiClientFactory = stub(GameManagementApiClientFactory);
        gameManagementApiClientFactory.instance.mockReturnValue(gameManagementApiClient);

        jackpotConfigsConsumer = {
            getJackpotConfig: jest.fn().mockReturnValue({
                _id: "config1",
                operatorId: "op1",
                siteNames: ["site1"],
                pools: {
                    minor: { init: 5000 },
                    major: { init: 25000 },
                    grand: { init: 50000 },
                },
            }),
        };

        gameData = {};
        fameQuery = new HallOfFameQuery(1, famesRepository, jackpotsRepository, gameManagementApiClientFactory, gameData, jackpotConfigsConsumer);
    });

    describe("queryBigWinningWinners", () => {
        const defaultPlayer = {
            session: {
                operatorId: "op1",
                siteName: "site1",
                currencyCode: "US",
            },
        };

        it("should return empty when page < 1", async () => {
            const actualResult = await fameQuery.queryBigWinningWinners(defaultPlayer, 0);
            expect(actualResult).toEqual({ bigWinningWinners: {} });
        });

        it("should return empty when pageSize < 1", async () => {
            const actualResult = await fameQuery.queryBigWinningWinners(defaultPlayer, 1, 0);
            expect(actualResult).toEqual({ bigWinningWinners: {} });
        });

        it("should apply correct filter based on jackpot config", async () => {
            // Arrange
            const expectedFilter = {
                operatorId: "op1",
                siteName: { $in: ["site1"] },
            };

            famesRepository.find().lean().exec.mockReturnValueOnce([]);
            famesRepository.countDocuments.mockReturnValue({ exec: jest.fn().mockResolvedValue(0) });

            // Act
            await fameQuery.queryBigWinningWinners(defaultPlayer, 1);

            // Assert
            expect(famesRepository.find).toHaveBeenCalledWith(expect.objectContaining(expectedFilter), expect.any(Object), expect.any(Object));
        });

        it("should handle missing jackpot config site names", async () => {
            // Arrange
            jackpotConfigsConsumer.getJackpotConfig.mockReturnValueOnce({
                _id: "config1",
                operatorId: "op1",
            });

            const expectedFilter = {
                operatorId: "op1",
            };

            famesRepository.find().lean().exec.mockReturnValueOnce([]);
            famesRepository.countDocuments.mockReturnValue({ exec: jest.fn().mockResolvedValue(0) });

            // Act
            await fameQuery.queryBigWinningWinners(defaultPlayer, 1);

            // Assert
            expect(famesRepository.find).toHaveBeenCalledWith(expect.objectContaining(expectedFilter), expect.any(Object), expect.any(Object));
        });

        it("should apply correct pagination", async () => {
            // Arrange
            const page = 2;
            const pageSize = 5;
            const expectedSkip = (page - 1) * pageSize;

            famesRepository.find().lean().exec.mockReturnValueOnce([]);
            famesRepository.countDocuments.mockReturnValue({ exec: jest.fn().mockResolvedValue(0) });

            // Act
            await fameQuery.queryBigWinningWinners(defaultPlayer, page, pageSize);

            // Assert
            expect(famesRepository.find).toHaveBeenCalledWith(
                expect.any(Object),
                expect.any(Object),
                expect.objectContaining({
                    skip: expectedSkip,
                    limit: pageSize,
                })
            );
        });

        it("should return winners with exchange rate codes", async () => {
            // Arrange
            const mockWinners = [
                {
                    name: "player1",
                    totalAmount: 100,
                    winningAmount: 500,
                    freeSpin: false,
                    rate: 1,
                    exchangeRateId: 1,
                },
            ];

            famesRepository.find().lean().exec.mockReturnValueOnce(mockWinners);
            famesRepository.countDocuments.mockReturnValue({ exec: jest.fn().mockResolvedValue(1) });

            // Act
            const result = await fameQuery.queryBigWinningWinners(defaultPlayer, 1);

            // Assert
            expect(result.bigWinningWinners.winners[0]).toEqual(
                expect.objectContaining({
                    name: "player1",
                    exchangeRateCode: { US: 1 },
                })
            );
        });
    });

    describe("queryJackpotWinners", () => {
        const defaultPlayer = {
            session: {
                operatorId: "op1",
                siteName: "site1",
                currencyCode: "US",
            },
        };

        it("should return empty when page < 1", async () => {
            const actualResult = await fameQuery.queryJackpotWinners(defaultPlayer, 0);
            expect(actualResult).toEqual({ jackpotWinners: {} });
        });

        it("should return empty when pageSize < 1", async () => {
            const actualResult = await fameQuery.queryJackpotWinners(defaultPlayer, 1, 0);
            expect(actualResult).toEqual({ jackpotWinners: {} });
        });

        it("should apply correct filter with jackpot config id", async () => {
            // Arrange
            const expectedFilter = {
                winnerName: { $exists: true },
                jackpotConfigId: "config1",
            };

            jackpotsRepository.find().lean().exec.mockReturnValueOnce([]);
            jackpotsRepository.countDocuments.mockReturnValue({ exec: jest.fn().mockResolvedValue(0) });

            // Act
            await fameQuery.queryJackpotWinners(defaultPlayer, 1);

            // Assert
            expect(jackpotsRepository.find).toHaveBeenCalledWith(expect.objectContaining(expectedFilter), expect.any(Object), expect.any(Object));
        });

        it("should calculate winning amount correctly", async () => {
            // Arrange
            const mockDate = new Date("2023-01-01");
            const mockWinner = {
                hitTime: mockDate,
                winnerName: "player1",
                prize: "minor",
                pool: "minor",
                amount: 1000,
                winningRatio: 0.98,
                exchangeRateId: 1,
            };

            jackpotsRepository.find.mockReturnValue({
                lean: () => ({
                    exec: () => [mockWinner],
                }),
            });
            jackpotsRepository.countDocuments.mockReturnValue({
                exec: jest.fn().mockResolvedValue(1),
            });

            // Act
            const result = await fameQuery.queryJackpotWinners(defaultPlayer, 1);

            // Assert
            expect(result.jackpotWinners.winners[0]).toEqual({
                time: mockDate,
                name: "player1",
                pool: "minor",
                winningAmount: 980,
                exchangeRateId: 1,
                exchangeRateCode: { US: 1 },
            });
        });

        it("should apply correct pagination", async () => {
            // Arrange
            const page = 2;
            const pageSize = 5;
            const expectedSkip = (page - 1) * pageSize;

            jackpotsRepository.find().lean().exec.mockReturnValueOnce([]);
            jackpotsRepository.countDocuments.mockReturnValue({ exec: jest.fn().mockResolvedValue(0) });

            // Act
            await fameQuery.queryJackpotWinners(defaultPlayer, page, pageSize);

            // Assert
            expect(jackpotsRepository.find).toHaveBeenCalledWith(
                expect.any(Object),
                expect.any(Object),
                expect.objectContaining({
                    skip: expectedSkip,
                    limit: pageSize,
                })
            );
        });
    });

    describe("updateExchangeRateCode", () => {
        it("should update exchange rate codes for winners", async () => {
            // Arrange
            const winners = [
                { exchangeRateId: 1, name: "player1" },
                { exchangeRateId: 2, name: "player2" },
            ];

            gameManagementApiClient.exchangeRates.getExchangeRatesByExIds.mockResolvedValueOnce({
                isSuccessful: true,
                data: [
                    { exId: 1, code: { US: 1.5 } },
                    { exId: 2, code: { US: 2.0 } },
                ],
            });

            const player = {
                session: { currencyCode: "US" },
            };

            // Act
            await fameQuery.updateExchangeRateCode(player, winners);

            // Assert
            expect(winners[0].exchangeRateCode).toEqual({ US: 1.5 });
            expect(winners[1].exchangeRateCode).toEqual({ US: 2.0 });
        });

        it("should handle missing exchange rates", async () => {
            // Arrange
            const winners = [{ exchangeRateId: 1, name: "player1" }];

            gameManagementApiClient.exchangeRates.getExchangeRatesByExIds.mockResolvedValueOnce({
                isSuccessful: true,
                data: [],
            });

            const player = {
                session: { currencyCode: "US" },
            };

            // Act
            await fameQuery.updateExchangeRateCode(player, winners);

            // Assert
            expect(Number.isNaN(winners[0].exchangeRateCode.US)).toBe(true);
        });
    });
});
