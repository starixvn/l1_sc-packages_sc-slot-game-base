import moment from "moment";
import PromotionClient from "sc-game-base/src/core/promotion-client/promotion-client";
import PromotionFreeSpinsPublisher from "sc-game-base/src/core/event-publishers/promotion-free-spins-publisher";

export default class PromotionFreeSpinsConsumer {
    /**
     * @param {PromotionClient} dependencies.gamePromotionApiClient
     * @param {PromotionFreeSpinsPublisher} dependencies.promotionFreeSpinsPublisher
     * @param {Object} dependencies.logService
     * @param {Object} dependencies.definition
     */
    constructor(gamePromotionApiClient, promotionFreeSpinsPublisher, logService, definition) {
        this.promotionApiClient = gamePromotionApiClient?.instance();
        this.promotionFreeSpinsPublisher = promotionFreeSpinsPublisher;
        this.logService = logService;
        this.definition = definition;
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
                winAmount: bet.betWin
            };
            this.promotionFreeSpinsPublisher.publishToUser(bet.uid, ticketDto);
            const ticketResult =await this.promotionApiClient.updatePromotionTicket(ticketDto);
            if (!ticketResult || !ticketResult.success) {
                this.logService.logError(`Failed to update promotion ticket for player ${player.profile.name}:`, {
                    error: ticketResult?.error || "Unknown error",
                    promotionId: bet.promotionId,
                    gameRoundId: bet.roundId,
                });
                return;
            }
        } catch (error) {
            this.logService.logError(`Error updating promotion ticket for player ${player.profile.name}:`, {
                error: error.message,
                promotionId: bet.promotionId,
                stack: error.stack,
            });
        }
    }
}
