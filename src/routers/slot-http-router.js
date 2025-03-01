import { logger, utils } from "sc-common";
import { Core } from "sc-game-base";

import { PaylineCalculator } from "./../board";
import SlotGameData from "./../slot-game-data";

export default class SlotHttpRouter extends Core.Routers.HttpRouter {
    /**
     * @param {Object} appConfigs
     * @param {SlotGameData} gameData
     * @param {PaylineCalculator} paylineCalculator
     * @param {logger} logService
     */
    constructor(appConfigs, gameData, historyQuery, metricQuery, logService, paylineCalculator) {
        super(appConfigs, gameData, historyQuery, metricQuery, logService);

        this.paylineCalculator = paylineCalculator;
    }

    init(app) {
        super.init(app);

        app.post(
            "/api/set-board",
            utils.authentication.useAuthenticate({
                authUrl: this.appConfigs.apiSettings.authUrl,
                audiences: this.appConfigs.authenticateSettings.audiences,
            }),
            (_req, res) => this.handleSetBoard(_req.body, res)
        );

        app.post(
            "/api/get-opening-bonus",
            utils.authentication.useAuthenticate({
                authUrl: this.appConfigs.apiSettings.authUrl,
                audiences: this.appConfigs.authenticateSettings.audiences,
            }),
            (_req, res) => this.handleGetOpeningBonus(res)
        );
    }

    handleGetOpeningBonus(res) {
        try {
            const usersOpeningBonus = [];
            Object.values(this.gameData.ingame).forEach((playerInGame) => {
                const { bonusChests, player } = playerInGame ?? { player: {}, bonusChests: {} };

                if (bonusChests) {
                    usersOpeningBonus.push(player.profile.name);
                }
            });

            res.send({ usersOpeningBonus });
        } catch (error) {
            this.logService.logError(error);
            res.send({ error: true });
        }
    }
}
