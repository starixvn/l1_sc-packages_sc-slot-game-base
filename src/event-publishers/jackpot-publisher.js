import { Core } from "sc-game-base";
import authenticationHelpers from "sc-game-base/src/core/helpers/authentication-helpers";

import JackpotValidator from "../validators/jackpot-validator";
import SlotGameData from "./../slot-game-data";

export default class JackpotPublisher extends Core.BaseEventPublishers.BaseEventPublisher {
    /**
     * @param {Number} gameId
     * @param {String} gameName
     * @param {SlotGameData} gameData
     * @param {Object} appConfigs
     * @param {logger} logService\
     * @param {JackpotValidator} jackpotValidator
     */

    constructor(gameId, gameName, gameData, appConfigs, logService, jackpotValidator, natsClient) {
        super(gameName, gameData);

        this.gameId = gameId;
        this.appConfigs = appConfigs;
        this.logService = logService;
        this.jackpotValidator = jackpotValidator;
        this.natsClient = natsClient;
    }

    publishLatestPool(pool, poolSettings) {
        this.publishToEligibleUsers({ jackpotPool: pool }, poolSettings);
    }

    async publishWinner(playerId, winner, poolSettings) {
        this.publishToUser(playerId, { winningJackpot: winner });
        this.publishToEligibleUsers({ jackpotWinner: winner }, poolSettings);

        await this.sendJackpotWinner(winner, poolSettings);
    }

    publishToEligibleUsers(payload, poolSettings) {
        const socketPlayers = Object.values(this.gameData.realPlayers)
            .filter(
                (player) =>
                    this.jackpotValidator.canAccessJackpot(player) &&
                    player.session?.operatorId === poolSettings.operatorId &&
                    (poolSettings.siteNames.length === 0 || poolSettings.siteNames.includes(player.session?.siteName))
            )
            .map((player) => player.socketClient);

        socketPlayers.forEach((socket) => {
            socket && socket.emit(this.gameName, payload);
        });
    }

    async sendJackpotWinner(winner, poolSettings) {
        try {
            const notificationServiceUrl = this.appConfigs.notificationServiceSettings.url;
            const params = {
                gameId: this.gameId,
                ...winner,
                operatorId: poolSettings.operatorId,
                jackpotConfigId: poolSettings.jackpotConfigId,
            };

            await authenticationHelpers.post(`${notificationServiceUrl}${"/jackpotWinner"}`, params);
        } catch (error) {
            this.logService.logError(error);
        }
    }

    publishFailedJackpot(playerId, error) {
        this.publishToUser(playerId, { jackpotError: error });
    }

    async publishRunningPools(runningPools) {
        await this.natsClient.publishJackpotRunningPools(runningPools);
    }
}
