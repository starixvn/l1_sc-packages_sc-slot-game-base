import { Core } from "sc-game-base";
import authenticationHelpers from "sc-game-base/src/core/helpers/authentication-helpers";

import SlotGameData from "./../slot-game-data";
import JackpotValidator from "../validators/jackpot-validator";

export default class JackpotPublisher extends Core.BaseEventPublishers.BaseEventPublisher {
    /**
     * @param {Number} gameId
     * @param {String} gameName
     * @param {SlotGameData} gameData
     * @param {Object} appConfigs
     * @param {logger} logService\
     * @param {JackpotValidator} jackpotValidator
     */

    constructor(gameId, gameName, gameData, appConfigs, logService, jackpotValidator) {
        super(gameName, gameData);

        this.gameId = gameId;
        this.appConfigs = appConfigs;
        this.logService = logService;
        this.jackpotValidator = jackpotValidator;
    }

    publishLatestPool({ jackpotPool, poolInfo }) {
        this.publishToEligibleUsers({ jackpotPool, poolInfo });
    }

    async publishWinner(playerId, winner, poolInfo) {
        this.publishToUser(playerId, { winningJackpot: winner });
        this.publishToEligibleUsers({ jackpotWinner: winner }, poolInfo);

        await this.sendJackpotWinner(winner, poolInfo);
    }

    publishToEligibleUsers(payload, poolInfo) {
        const socketPlayers = Object.values(this.gameData.realPlayers)
            .filter(
                (player) =>
                    this.jackpotValidator.canAccessJackpot(player) &&
                    player.session.operatorId === poolInfo.operatorId &&
                    (poolInfo.siteNames.length === 0 || poolInfo.siteNames.includes(player.session.siteName))
            )
            .map((player) => player.socketClient);

        socketPlayers.forEach((socket) => {
            socket && socket.emit(this.gameName, payload);
        });
    }

    async sendJackpotWinner(winner, poolInfo) {
        try {
            const notificationServiceUrl = this.appConfigs.notificationServiceSettings.url;
            const params = {
                gameId: this.gameId,
                ...winner,
                operatorId: poolInfo.operatorId,
                siteNames: poolInfo.siteNames,
            };

            await authenticationHelpers.post(`${notificationServiceUrl}${"/jackpotWinner"}`, params);
        } catch (error) {
            this.logService.logError(error);
        }
    }

    publishFailedJackpot(playerId, error) {
        this.publishToUser(playerId, { jackpotError: error });
    }
}
