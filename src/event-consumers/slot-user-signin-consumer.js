import { Table } from "sc-game-base";

export default class SlotUserSignInConsumer extends Table.EventConsumers.TableUserSignInConsumer {
    /**
     * @param {Object} dependencies
     * @param {TableGameDefinition} dependencies.definition
     * @param {TableGameData} dependencies.gameData
     * @param {TableUserSignInPublisher} dependencies.userSignInPublisher
     * @param {PlayGamePermissionValidator} dependencies.playGamePermissionValidator
     * @param {Object} dependencies.appConfigs
     * @param {GameManagementApiClientFactory} dependencies.gameManagementApiClientFactory
     * @param {Object} dependencies.logService
     * @param {PromotionClient} [dependencies.gamePromotionApiClient]
     */
    constructor({
        definition,
        gameData,
        userSignInPublisher,
        playGamePermissionValidator,
        appConfigs,
        gameManagementApiClientFactory,
        logService,
        gamePromotionApiClient,
    }) {
        super({
            definition,
            gameData,
            userSignInPublisher,
            playGamePermissionValidator,
            appConfigs,
            gameManagementApiClientFactory,
            logService,
            gamePromotionApiClient,
        });
    }

    extendPromo(baseData, originalPromotion) {
        return {
            ...baseData,
            betLevel: originalPromotion.betLevel,
        };
    }
}
