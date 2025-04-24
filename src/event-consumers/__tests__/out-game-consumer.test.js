import { stub } from "jest-micro-auto-stub";
import { GameManagementApiClientFactory } from "sc-game-base/src/core/game-management-api";
import OutGameConsumer from "../out-game-consumer";
import { bonusConsumer, freeSpinsConsumer, jackpotGameConsumer } from "./stubs";

const gameManagementApiClientFactory = stub(GameManagementApiClientFactory);
const gameManagementApiClient = {
    gameNotifications: {
        updateGameNotification: jest.fn(() => ({ isSuccessful: true })),
        deleteGameNotification: jest.fn(() => ({ isSuccessful: true })),
        clearGameNotification: jest.fn(() => ({ isSuccessful: true })),
    },
};
gameManagementApiClientFactory.instance.mockReturnValue(gameManagementApiClient);

describe("out-game-consumer", () => {
    afterEach(() => jest.clearAllMocks());

    describe("consume", () => {
        it("when have realPlayers should call autoOpenRemainingChests", async () => {
            // arrange
            const gameData = { realPlayers: { user1: { profile: {} } } };
            const socketClient = { id: "user1" };
            const consumer = new OutGameConsumer(1, gameData, bonusConsumer, freeSpinsConsumer, jackpotGameConsumer, gameManagementApiClientFactory);
            consumer.upsertFreeSpinNotification = jest.fn();

            // act
            await consumer.consume(socketClient);

            // assert
            expect(consumer.bonusConsumer.autoOpenRemainingChests).toHaveBeenCalled();
        });

        it("when not have realPlayers should not call autoOpenRemainingChests", async () => {
            // arrange
            const gameData = { realPlayers: {} };
            const socketClient = { id: "user1" };
            const consumer = new OutGameConsumer(1, gameData, bonusConsumer, freeSpinsConsumer, jackpotGameConsumer, gameManagementApiClientFactory);
            consumer.upsertFreeSpinNotification = jest.fn();

            // act
            await consumer.consume(socketClient);

            // assert
            expect(consumer.bonusConsumer.autoOpenRemainingChests).not.toHaveBeenCalled();
        });
    });

    describe("upsertFreeSpinNotification", () => {
        it("when not have latestExpiredFreeSpinSet should call gameManagementApiClient.gameNotifications.deleteGameNotification", () => {
            // arrange
            const gameData = { realPlayers: { user1: { profile: {}, UID: "123" } } };
            const consumer = new OutGameConsumer(1, gameData, bonusConsumer, freeSpinsConsumer, jackpotGameConsumer, gameManagementApiClientFactory);

            // act
            consumer.upsertFreeSpinNotification(gameData.realPlayers.user1);

            // assert
            expect(gameManagementApiClient.gameNotifications.deleteGameNotification).toHaveBeenCalledWith({ gameId: 1, uid: "123" });
        });

        it("when have latestExpiredFreeSpinSet should call gameManagementApiClient.gameNotifications.updateGameNotification", () => {
            // arrange
            const gameData = { realPlayers: { user1: { UID: "123" } } };
            const bonusConsumer = { autoOpenRemainingChests: jest.fn() };

            freeSpinsConsumer.getLatestExpiredFreeSpinSet.mockReturnValueOnce({ expiryTime: 1 });

            const consumer = new OutGameConsumer(1, gameData, bonusConsumer, freeSpinsConsumer, jackpotGameConsumer, gameManagementApiClientFactory);

            // act
            consumer.upsertFreeSpinNotification(gameData.realPlayers.user1);

            // assert
            expect(gameManagementApiClient.gameNotifications.updateGameNotification).toHaveBeenCalledWith({
                gameId: 1,
                uid: "123",
                gameInfo: { freeSpinExpiryTime: 1 },
            });
        });
    });
});
