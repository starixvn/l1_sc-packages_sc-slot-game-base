import { stub } from "jest-micro-auto-stub";
import { Core } from "sc-game-base";
import { logger } from "sc-common";
import authenticationHelpers from "sc-game-base/src/core/helpers/authentication-helpers";
import NatsClient from "../../nats-client";
import JackpotPublisher from "../jackpot-publisher";
import JackpotValidator from "../../validators/jackpot-validator";

jest.mock("sc-game-base/src/core/helpers/authentication-helpers");

const gameData = {
    realPlayers: [
        {
            session: {
                operatorId: "op1",
                siteName: "site1",
                disableJackpotGames: true,
            },
            socketClient: {
                emit: jest.fn(),
            },
        },
        {
            session: {
                operatorId: "op1",
                siteName: "site1",
                disableJackpotGames: false,
            },
            socketClient: {
                emit: jest.fn(),
            },
        },
    ],
};

describe("jackpot-publisher", () => {
    let logService;
    let jackpotValidator;
    let natsClient;
    let publisher;

    beforeEach(() => {
        logService = {
            logError: jest.fn(),
            logWarning: jest.fn(),
            logInfo: jest.fn(),
            logCritical: jest.fn(),
        };
        jackpotValidator = {
            canAccessJackpot: jest.fn(),
        };
        natsClient = {
            publishJackpotWinner: jest.fn(),
            publishJackpotRunningPools: jest.fn(),
        };
        publisher = new JackpotPublisher(1, "TestGame", gameData, {}, logService, jackpotValidator, natsClient);
    });

    describe("extends", () => {
        it("should extend Core.BaseEventPublishers.BaseEventPublisher", () => {
            expect(publisher instanceof Core.BaseEventPublishers.BaseEventPublisher).toBe(true);
        });
    });

    describe("publishLatestPool", () => {
        it("should publish to eligible users", () => {
            // Arrange
            const pool = { pool: "major", amount: 1000 };
            const poolSettings = { operatorId: "op1", siteNames: ["site1"] };
            jackpotValidator.canAccessJackpot.mockImplementation((player) => !player.session.disableJackpotGames);

            // Act
            publisher.publishLatestPool(pool, poolSettings);

            // Assert
            expect(gameData.realPlayers[0].socketClient.emit).not.toHaveBeenCalled();
            expect(gameData.realPlayers[1].socketClient.emit).toHaveBeenCalledWith("TestGame", { jackpotPool: pool });
        });
    });

    describe("publishWinner", () => {
        beforeEach(() => {
            publisher.publishToUser = jest.fn();
        });

        it("should publish winner and send notification", async () => {
            // Arrange
            const playerId = "player1";
            const winner = { username: "winner", amount: 1000 };
            const poolSettings = { _id: "config1", operatorId: "op1", siteNames: ["site1"] };
            jackpotValidator.canAccessJackpot.mockImplementation((player) => !player.session.disableJackpotGames);

            // Act
            await publisher.publishWinner(playerId, winner, poolSettings);

            // Assert
            expect(publisher.publishToUser).toHaveBeenCalledWith(playerId, { winningJackpot: winner });
            expect(gameData.realPlayers[1].socketClient.emit).toHaveBeenCalledWith("TestGame", { jackpotWinner: winner });
            expect(natsClient.publishJackpotWinner).toHaveBeenCalledWith({
                gameId: 1,
                ...winner,
                jackpotConfigId: "config1",
            });
        });

        it("should handle notification errors gracefully", async () => {
            // Arrange
            const error = new Error("Failed to notify");
            natsClient.publishJackpotWinner.mockRejectedValue(error);
            const poolSettings = { _id: "config1" };

            // Act
            await publisher.publishWinner("player1", { username: "winner" }, poolSettings);

            // Assert
            expect(logService.logError).toHaveBeenCalledWith(error);
        });
    });

    describe("publishFailedJackpot", () => {
        it("should publish error to user", () => {
            // Arrange
            const playerId = "player1";
            const error = "Invalid jackpot";
            publisher.publishToUser = jest.fn();

            // Act
            publisher.publishFailedJackpot(playerId, error);

            // Assert
            expect(publisher.publishToUser).toHaveBeenCalledWith(playerId, { jackpotError: error });
        });
    });

    describe("publishRunningPools", () => {
        it("should publish running pools via nats", async () => {
            // Arrange
            const pools = [{ pool: "major", amount: 1000 }];

            // Act
            await publisher.publishRunningPools(pools);

            // Assert
            expect(natsClient.publishJackpotRunningPools).toHaveBeenCalledWith(pools);
        });
    });
});
