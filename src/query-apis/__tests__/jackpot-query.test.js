import { stubMongoose } from "jest-micro-auto-stub";
import mongoose from "mongoose";
import JackpotQuery from "../jackpot-query";

describe("JackpotQuery", () => {
    let jackpotsRepository;
    let gameData;
    let jackpotConfigsConsumer;
    let jackpotQuery;

    beforeEach(() => {
        jackpotsRepository = stubMongoose(mongoose.Model);
        gameData = {};
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
        jackpotQuery = new JackpotQuery(jackpotsRepository, gameData, jackpotConfigsConsumer);
    });

    describe("queryRunningJackpot", () => {
        const defaultOperatorId = "op1";
        const defaultSiteName = "site1";

        it("should return empty array when no jackpot config exists", async () => {
            // Arrange
            jackpotConfigsConsumer.getJackpotConfig.mockReturnValueOnce(null);

            // Act
            const result = await jackpotQuery.queryRunningJackpot(defaultOperatorId, defaultSiteName);

            // Assert
            expect(result).toEqual([]);
        });

        it("should apply correct filter for running pools", async () => {
            // Arrange
            const expectedFilter = {
                winnerName: { $exists: false },
                jackpotConfigId: "config1",
            };

            jackpotsRepository.find.mockReturnValue({
                lean: () => ({
                    exec: () => [],
                }),
            });

            // Act
            await jackpotQuery.queryRunningJackpot(defaultOperatorId, defaultSiteName);

            // Assert
            expect(jackpotsRepository.find).toHaveBeenCalledWith(expect.objectContaining(expectedFilter), expect.any(Object), expect.any(Object));
        });

        it("should return correct projection of running pools", async () => {
            // Arrange
            const mockPools = [
                { prize: "minor", amount: 5000 },
                { prize: "major", amount: 25000 },
            ];

            jackpotsRepository.find.mockReturnValue({
                lean: () => ({
                    exec: () => mockPools,
                }),
            });

            // Act
            const result = await jackpotQuery.queryRunningJackpot(defaultOperatorId, defaultSiteName);

            // Assert
            expect(result).toEqual(mockPools);
        });

        it("should sort pools by pool name", async () => {
            // Arrange
            jackpotsRepository.find.mockReturnValue({
                lean: () => ({
                    exec: () => [],
                }),
            });

            // Act
            await jackpotQuery.queryRunningJackpot(defaultOperatorId, defaultSiteName);

            // Assert
            expect(jackpotsRepository.find).toHaveBeenCalledWith(
                expect.any(Object),
                expect.any(Object),
                expect.objectContaining({
                    sort: { pool: 1 },
                })
            );
        });
    });

    describe("queryJackpotWinner", () => {
        const defaultOperatorId = "op1";
        const defaultSiteName = "site1";

        it("should return empty array when no jackpot config exists", async () => {
            // Arrange
            jackpotConfigsConsumer.getJackpotConfig.mockReturnValueOnce(null);

            // Act
            const result = await jackpotQuery.queryJackpotWinner(defaultOperatorId, defaultSiteName);

            // Assert
            expect(result).toEqual([]);
        });

        it("should apply correct filter for jackpot winners", async () => {
            // Arrange
            const expectedFilter = {
                winnerName: { $exists: true },
                jackpotConfigId: "config1",
            };

            jackpotsRepository.find.mockReturnValue({
                lean: () => ({
                    exec: () => [],
                }),
            });

            // Act
            await jackpotQuery.queryJackpotWinner(defaultOperatorId, defaultSiteName);

            // Assert
            expect(jackpotsRepository.find).toHaveBeenCalledWith(expect.objectContaining(expectedFilter), expect.any(Object), expect.any(Object));
        });

        it("should return correct projection of jackpot winners", async () => {
            // Arrange
            const mockWinners = [
                {
                    prize: "minor",
                    winnerName: "player1",
                    amount: 5000,
                    winningRatio: 0.98,
                    exchangeRateId: 1,
                },
            ];

            jackpotsRepository.find.mockReturnValue({
                lean: () => ({
                    exec: () => mockWinners,
                }),
            });

            // Act
            const result = await jackpotQuery.queryJackpotWinner(defaultOperatorId, defaultSiteName);

            // Assert
            expect(result).toEqual(mockWinners);
        });

        it("should sort winners by hit time in descending order", async () => {
            // Arrange
            jackpotsRepository.find.mockReturnValue({
                lean: () => ({
                    exec: () => [],
                }),
            });

            // Act
            await jackpotQuery.queryJackpotWinner(defaultOperatorId, defaultSiteName);

            // Assert
            expect(jackpotsRepository.find).toHaveBeenCalledWith(
                expect.any(Object),
                expect.any(Object),
                expect.objectContaining({
                    sort: { hitTime: -1 },
                })
            );
        });

        it("should include all required winner fields in projection", async () => {
            // Arrange
            const expectedProjection = {
                _id: false,
                pool: "$prize",
                winnerName: true,
                amount: true,
                winningRatio: true,
                exchangeRateId: true,
            };

            jackpotsRepository.find.mockReturnValue({
                lean: () => ({
                    exec: () => [],
                }),
            });

            // Act
            await jackpotQuery.queryJackpotWinner(defaultOperatorId, defaultSiteName);

            // Assert
            expect(jackpotsRepository.find).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining(expectedProjection), expect.any(Object));
        });
    });
});
