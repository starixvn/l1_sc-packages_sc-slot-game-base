import { EventInterceptors } from "sc-game-base/src/core";

export default class SlotPromotionInterceptor extends EventInterceptors.PromotionBetInterceptor {
    shouldCompletePromotion(player) {
        return player.promotion.remainingBonusItems === 0 && player.promotion.freeSpinAvailable <= 0 && player.promotion.bonus === 0;
    }

    async beforeEvent(context) {
        const { player } = context;

        if (player.promotion.freeSpinAvailable === 0) {
            await super.beforeEvent(context);
            return;
        }

        player.promotion.freeSpinAvailable--;
    }
}
