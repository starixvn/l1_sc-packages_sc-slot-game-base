import { Core } from "sc-game-base";

export default class PromotionFreeSpinsConsumer extends Core.BaseEventConsumers.PromotionFreeSpinsConsumer {
    /**
     * @param {Core.PromotionClient} dependencies.gamePromotionApiClient
     * @param {Core.EventPublishers.PromotionFreeSpinsPublisher} dependencies.promotionFreeSpinsPublisher
     * @param {Object} dependencies.logService
     * @param {Object} dependencies.definition
     * @param {GameData} dependencies.gameData
     */
    constructor({ gamePromotionApiClient, promotionFreeSpinsPublisher, logService, definition, gameData }) {
        super({
            gameData,
            promotionFreeSpinsPublisher,
            logService,
            gamePromotionApiClient,
        });

        this.definition = definition;
    }

    isPromotionCompleted(player) {
        return player.promotion.remainingBonusItems === 0 && player.promotion.freeSpinAvailable <= 0 && ( player.promotion.bonus === 0 || !player.promotion.bonus );
    }

    async handleBonusInGame(player, bet) {
        try {
            const ticketDto = {
                playerId: player.session.playerId,
                operatorId: player.session.operatorId,
                siteName: player.session.siteName,
                promotionId: player.promotion.promotionId,
                gameId: this.definition.id,
                gameRoundId: bet.id,
                appType: player.session.system,
                betAmount: bet.bet,
                winAmount: bet.betWin,
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
}
