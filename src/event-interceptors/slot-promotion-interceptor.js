import { EventInterceptors } from "sc-game-base/src/core";

export default class SlotPromotionInterceptor extends EventInterceptors.PromotionBetInterceptor {
    /**
     * @param {Object} dependencies
     * @param {Object} dependencies.logService - Logging service
     * @param {Object} dependencies.definition - Game definition
     * @param {Object} dependencies.placeBetPublisher - Publisher for bet events
     * @param {Object} dependencies.gamePromotionApiClient - Promotion API client
     */
    constructor({ logService, definition, placeBetPublisher, gamePromotionApiClient }) {
        super({ logService, definition, placeBetPublisher, gamePromotionApiClient });
    }

    transformEventData(transformName, context) {
        let { payload, betInfo, betRecord, betLog, bet } = context;
        try {
            switch (transformName) {
                case "enhanceBetInfo":
                    betInfo = super.transformEventData(transformName, context);

                    if (payload?.betChoice && betInfo) {
                        betInfo.contributionRate = 0;
                        betInfo.contributionAmount = 0;

                        betInfo.promotionId = payload.promotionId;
                    }
                    return betInfo;

                case "enhanceBetRecord":
                    betRecord = super.transformEventData(transformName, context);

                    if (bet && betRecord) {
                        betRecord.promotionId = payload.promotionId;
                    }
                    return betRecord;

                default:
                    return super.transformEventData(transformName, context);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async afterSuccessEvent(context) {
        await super.afterSuccessEvent(context);
    }

    async afterFailureEvent(context) {
        await super.afterFailureEvent(context);
    }
}
