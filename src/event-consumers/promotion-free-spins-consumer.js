import { Core } from "sc-game-base";

export default class PromotionFreeSpinsConsumer extends Core.BaseEventConsumers.PromotionFreeSpinsConsumer {
    /**
     * @param {Core.PromotionClient} dependencies.gamePromotionApiClient
     * @param {Core.EventPublishers.PromotionFreeSpinsPublisher} dependencies.promotionFreeSpinsPublisher
     * @param {Object} dependencies.logService
     * @param {Object} dependencies.definition
     * @param {GameData} dependencies.gameData
     * @param {FreeSpinsConsumer} dependencies.freeSpinsConsumer
     */
    constructor({ gamePromotionApiClient, promotionFreeSpinsPublisher, logService, definition, gameData, freeSpinsConsumer }) {
        super({
            gameData,
            promotionFreeSpinsPublisher,
            logService,
            gamePromotionApiClient,
        });

        this.definition = definition;
        this.freeSpinsConsumer = freeSpinsConsumer;
    }

    isPromotionCompleted(player) {
        return (
            player.promotion.remainingBonusItems === 0 &&
            (player.promotion.freeSpinAvailable <= 0 || !player.promotion.freeSpinAvailable) &&
            (player.promotion.bonus === 0 || !player.promotion.bonus)
        );
    }

    async handleBonusInGame(player, bet) {
        try {
            const ticketDto = {
                playerId: player.session.playerId,
                operatorId: player.session.operatorId,
                siteName: player.session.siteName,
                promotionId: bet.promotionId,
                gameId: this.definition.id,
                gameRoundId: bet.id,
                appType: player.session.system,
                betAmount: bet.bet,
                winAmount: bet.betWin,
                baseWinAmount: bet.baseBetWin,
            };
            this.promotionFreeSpinsPublisher.publishToUser(bet.uid, ticketDto);
            const ticketResult = await this.promotionApiClient.updatePromotionTicket(ticketDto);

            if (!ticketResult || !ticketResult.success) {
                this.logService.logError(
                    `Failed to update promotion ticket for player ${{
                        error: ticketResult?.error || "Unknown error",
                        playerName: player.profile.name,
                        promotionId: bet.promotionId,
                        gameRoundId: bet.roundId,
                    }}`
                );
            }
            if (player.promotion) {
                player.promotion.bonus = 0;
            }
        } catch (error) {
            this.logService.logError(error);
        }
    }

    extendPromo(baseData, originalPromotion) {
        return {
            ...baseData,
            betLevel: originalPromotion.betLevel,
        };
    }

    async handlePromotionFreeSpinsExpiry() {
        const promotionIds = this.gameData.expiringPromotions.map((promotion) => promotion._id);
        await this.freeSpinsConsumer.stopExpiredPromotionChain(promotionIds);
        await super.handlePromotionFreeSpinsExpiry();
    }
}
