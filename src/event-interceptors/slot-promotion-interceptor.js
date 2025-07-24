import { EventInterceptors } from "sc-game-base/src/core";

export default class SlotPromotionInterceptor extends EventInterceptors.PromotionBetInterceptor {
    shouldCompletePromotion(player) {
        return player.promotion.remainingBonusItems === 0 && player.promotion.freeSpinAvailable <= 1 && player.promotion.bonus === 0;
    }
}
