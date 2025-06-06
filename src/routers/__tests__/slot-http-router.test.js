import { stub } from "jest-micro-auto-stub";
import { logger } from "sc-common/logger";
import { HttpRouter } from "sc-game-base/src/core/routers";
import { SlotHttpRouter } from "..";
import odds from "../../../tests/odds";
import { PaylineCalculator } from "../../board";
import SlotGameData from "../../slot-game-data";

describe("SlotHttpRouter", () => {
    let gameData;
    let appConfigs;
    let app;
    let paylineCalculator;
    let historyQuery;
    let metricQuery;
    let logService;
    let jackpotQuery;
    let res;
    let router;

    beforeEach(() => {
        gameData = stubGameData();
        appConfigs = {
            apiSettings: {
                authUrl: "http://localhost",
            },
            authenticateSettings: {
                audiences: [],
            },
        };
        app = {
            get: jest.fn(),
            post: jest.fn(),
        };
        paylineCalculator = new PaylineCalculator();
        historyQuery = {};
        metricQuery = {};
        logService = stub(logger);
        jackpotQuery = {
            queryRunningJackpot: jest.fn(),
            queryJackpotWinner: jest.fn(),
        };
        res = {
            send: jest.fn(),
        };

        router = new SlotHttpRouter(appConfigs, gameData, historyQuery, metricQuery, logService, paylineCalculator, jackpotQuery);

        jest.clearAllMocks();
    });

    it("should inherit from HttpRouter", () => {
        expect(router instanceof HttpRouter).toBe(true);
    });

    describe("init", () => {
        it("should call super init", () => {
            // Arrange
            jest.spyOn(HttpRouter.prototype, "init");

            // Act
            router.init(app);

            // Assert
            expect(HttpRouter.prototype.init).toHaveBeenCalledWith(app);
        });

        it("should register all required endpoints", () => {
            // Act
            router.init(app);

            // Assert
            expect(app.post).toHaveBeenCalledWith("/api/set-board", expect.any(Function), expect.any(Function));
            expect(app.post).toHaveBeenCalledWith("/api/get-opening-bonus", expect.any(Function), expect.any(Function));
            expect(app.get).toHaveBeenCalledWith("/api/get-running-jackpot", expect.any(Function));
            expect(app.get).toHaveBeenCalledWith("/api/get-jackpot-winner", expect.any(Function));
        });
    });

    describe("handleGetRunningJackpot", () => {
        const params = {
            operatorId: "op1",
            siteName: "site1",
        };

        it("should return running jackpot data on success", async () => {
            // Arrange
            const mockJackpot = [
                { prize: "minor", amount: 5000 },
                { prize: "major", amount: 25000 },
            ];
            jackpotQuery.queryRunningJackpot.mockResolvedValueOnce(mockJackpot);

            // Act
            await router.handleGetRunningJackpot(params, res);

            // Assert
            expect(jackpotQuery.queryRunningJackpot).toHaveBeenCalledWith(params.operatorId, params.siteName);
            expect(res.send).toHaveBeenCalledWith(mockJackpot);
        });

        it("should handle errors and return error response", async () => {
            // Arrange
            const error = new Error("Database error");
            jackpotQuery.queryRunningJackpot.mockRejectedValueOnce(error);

            // Act
            await router.handleGetRunningJackpot(params, res);

            // Assert
            expect(logService.logError).toHaveBeenCalledWith(error);
            expect(res.send).toHaveBeenCalledWith({ error: true });
        });
    });

    describe("handleGetJackpotWinner", () => {
        const params = {
            operatorId: "op1",
            siteName: "site1",
        };

        it("should return jackpot winner data on success", async () => {
            // Arrange
            const mockWinners = [{ prize: "minor", winnerName: "player1", amount: 5000 }];
            jackpotQuery.queryJackpotWinner.mockResolvedValueOnce(mockWinners);

            // Act
            await router.handleGetJackpotWinner(params, res);

            // Assert
            expect(jackpotQuery.queryJackpotWinner).toHaveBeenCalledWith(params.operatorId, params.siteName);
            expect(res.send).toHaveBeenCalledWith(mockWinners);
        });

        it("should handle errors and return error response", async () => {
            // Arrange
            const error = new Error("Database error");
            jackpotQuery.queryJackpotWinner.mockRejectedValueOnce(error);

            // Act
            await router.handleGetJackpotWinner(params, res);

            // Assert
            expect(logService.logError).toHaveBeenCalledWith(error);
            expect(res.send).toHaveBeenCalledWith({ error: true });
        });
    });

    describe("handleSetBoard", () => {
        it("should handle invalid params", () => {
            // Arrange
            const invalidParams = [{}, { name: "player1" }, { result: [1, 2, 3] }, null, undefined];

            // Act & Assert
            invalidParams.forEach((params) => {
                router.handleSetBoard(params, res);
                expect(logService.logError).toHaveBeenCalled();
                expect(res.send).toHaveBeenCalledWith({ error: true });
                jest.clearAllMocks();
            });
        });

        it("should process valid board setup", () => {
            // Arrange
            const params = {
                name: "player1",
                result: [1, 2, 2, 1, 4, 4, 1, 9, 3, 4, 1, 2, 7, 2, 2],
            };

            // Act
            router.handleSetBoard(params, res);

            // Assert
            expect(logService.logWarning).toHaveBeenCalled();
            expect(gameData.settlementResultFromAdmin[params.name]).toBe(params.result);
            expect(res.send).toHaveBeenCalled();
        });

        it("should handle calculation errors", () => {
            // Arrange
            const params = {
                name: "player1",
                result: [1], // Invalid result length
            };

            // Act
            router.handleSetBoard(params, res);

            // Assert
            expect(logService.logError).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith({ error: true });
        });
    });

    describe("handleGetOpeningBonus", () => {
        it("should return empty array when no players are in game", () => {
            // Arrange
            gameData.ingame = {};

            // Act
            router.handleGetOpeningBonus(res);

            // Assert
            expect(res.send).toHaveBeenCalledWith({ usersOpeningBonus: [] });
        });

        it("should return players with active bonus chests", () => {
            // Arrange
            const player1 = {
                player: { profile: { name: "player1" } },
                bonusChests: [{ amount: 100, picked: false }],
            };
            const player2 = {
                player: { profile: { name: "player2" } },
                bonusChests: null,
            };
            gameData.ingame = {
                player1,
                player2,
            };

            // Act
            router.handleGetOpeningBonus(res);

            // Assert
            expect(res.send).toHaveBeenCalledWith({
                usersOpeningBonus: ["player1"],
            });
        });

        it("should handle null/undefined game data", () => {
            // Arrange
            const invalidData = [null, undefined];

            // Act & Assert
            invalidData.forEach((data) => {
                gameData.ingame = data;
                router.handleGetOpeningBonus(res);
                expect(logService.logError).toHaveBeenCalled();
                expect(res.send).toHaveBeenCalledWith({ error: true });
                jest.clearAllMocks();
            });
        });

        it("should handle invalid player data", () => {
            // Arrange
            gameData.ingame = {
                player1: null,
                player2: undefined,
                player3: {},
            };

            // Act
            router.handleGetOpeningBonus(res);

            // Assert
            expect(logService.logError).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith({ error: true });
        });
    });
});

function stubGameData() {
    const gameData = new SlotGameData();
    gameData.remainingTime = 20;
    gameData.gameConfigs = {
        enabled: true,
        minbet: 1,
        maxbet: 1000,
        slotsConfig: {
            stakeLevels: [{ stake: 0.1 }, { stake: 1 }, { stake: 5 }],
            icons: odds,
        },
    };
    gameData.ingame = {};
    gameData.settlementResultFromAdmin = {};
    return gameData;
}
