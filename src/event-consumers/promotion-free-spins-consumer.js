import PromotionClient from "sc-game-base/src/core/promotion-client/promotion-client";
import PromotionFreeSpinsPublisher from "sc-game-base/src/core/event-publishers/promotion-free-spins-publisher";
import { Core } from "sc-game-base";

export default class PromotionFreeSpinsConsumer extends Core.BaseEventConsumers.PromotionFreeSpinsConsumer{
    /**
     * @param {PromotionClient} dependencies.gamePromotionApiClient
     * @param {PromotionFreeSpinsPublisher} dependencies.promotionFreeSpinsPublisher
     * @param {Object} dependencies.logService
     * @param {Object} dependencies.definition
     * @param {GameData} dependencies.gameData
     */
    constructor(gamePromotionApiClient, promotionFreeSpinsPublisher, logService, definition, gameData) {
        super({
            gameData,
            promotionFreeSpinsPublisher,
            logService,
            gamePromotionApiClient
        });
        
        this.definition = definition;
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
