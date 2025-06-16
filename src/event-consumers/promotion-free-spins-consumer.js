import moment from "moment";
import PromotionClient from "sc-game-base/src/core/promotion-client/promotion-client";
import PromotionFreeSpinsPublisher from "sc-game-base/src/core/event-publishers/promotion-free-spins-publisher";

export default class PromotionFreeSpinsConsumer {
    /**
     * @param {PromotionClient} dependencies.gamePromotionApiClient
     * @param {PromotionFreeSpinsPublisher} dependencies.promotionFreeSpinsPublisher
     */
    constructor(gamePromotionApiClient, promotionFreeSpinsPublisher) {
        this.promotionApiClient = gamePromotionApiClient?.instance();
        this.promotionFreeSpinsPublisher = promotionFreeSpinsPublisher;
    }

    toYMDHM = (date) => moment.utc(date).format("YYYY-MM-DDTHH:mm");

    async handlePromotionFreeSpinsExpiry(gameId) {
        const now = moment.utc();          
        const runningPromotions = await this.promotionApiClient.getExpiringPromotions(gameId);
        for (const promotion of runningPromotions) {
            if (this.toYMDHM(now) === this.toYMDHM(new Date(promotion.endDate))) {
                this.promotionFreeSpinsPublisher.publishEndPromotion(promotion.players);
            }
        }
    }
}
