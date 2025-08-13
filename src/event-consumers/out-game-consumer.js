import { Core } from "sc-game-base";

import { post } from "sc-game-base/src/core/game-management-api";
import SlotGameData from "./../slot-game-data";
import BonusConsumer from "./bonus-consumer";
import FreeSpinsConsumer from "./free-spins-consumer";
import JackpotGameConsumer from "./jackpot-game-consumer";

export default class OutGameConsumer extends Core.BaseEventConsumers.UserDisconnectConsumer {
    /**
     * @param {Number} gameId
     * @param {SlotGameData} gameData
     * @param {BonusConsumer} bonusConsumer
     * @param {FreeSpinsConsumer} freeSpinsConsumer
     * @param {JackpotGameConsumer} jackpotGameConsumer
     */
    constructor(gameId, gameData, bonusConsumer, freeSpinsConsumer, jackpotGameConsumer, gameManagementApiClientFactory, userTrackingClient) {
        super(gameData, userTrackingClient);

        this.gameId = gameId;
        this.bonusConsumer = bonusConsumer;
        this.freeSpinsConsumer = freeSpinsConsumer;
        this.jackpotGameConsumer = jackpotGameConsumer;
        this.gameManagementApiClient = gameManagementApiClientFactory.instance();
    }

    /**
     * @param {SocketIO.Socket} socketClient
     */
    async consume(socketClient) {
        const realPlayer = this.gameData.realPlayers[socketClient.id];

        if (realPlayer) {
            await this.jackpotGameConsumer.autoPickJackpot(realPlayer);
            await this.bonusConsumer.autoOpenRemainingChests(realPlayer);
            await this.upsertFreeSpinNotification(realPlayer);
        }

        super.consume(socketClient);
    }

    async upsertFreeSpinNotification(realPlayer) {
        const latestExpiredFreeSpinSet = this.freeSpinsConsumer.getLatestExpiredFreeSpinSet(realPlayer);

        if (latestExpiredFreeSpinSet) {
            await post(
                this.gameManagementApiClient.gameNotifications.updateGameNotification({
                    gameId: this.gameId,
                    uid: realPlayer.UID,
                    gameInfo: {
                        freeSpinExpiryTime: latestExpiredFreeSpinSet.expiryTime,
                    },
                })
            );
        } else {
            await post(
                this.gameManagementApiClient.gameNotifications.deleteGameNotification({
                    gameId: this.gameId,
                    uid: realPlayer.UID,
                })
            );
        }
    }
}
