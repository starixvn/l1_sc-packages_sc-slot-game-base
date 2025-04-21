import axios from "axios";

export default class PromotionManagement {
    constructor(definition, appConfigs, logService) {
        this.promotionSettings = appConfigs.promotionSettings;
        this.definition = definition;
        this.axios = axios.create({ baseURL: this.promotionSettings.url });
        this.logService = logService;
    }

    async joinPromotion(player) {
        try {
            const response = await axios.get(`${this.promotionSettings.endpoints.playerPromotion}/${this.definition.id}/${player.session.playerId}`);
            return response.data;
        } catch (error) {
            this.logService.logError(error);
            return null;
        }
    }

    async useBonus(player) {
        const response = await axios.post(`${this.promotionSettings.endpoints.useBonus}/${this.definition.id}`, {
            playerId: player.session.playerId,
            operatorId: player.session.operatorId,
            promotionId: player.promotion.id,
        });
        return response.data;
    }

    async gainBonus(player, amount) {
        const response = await axios.post(`${this.promotionSettings.endpoints.giveBonus}/${this.definition.id}`, {
            playerId: player.session.playerId,
            operatorId: player.session.operatorId,
            promotionId: player.promotion.id,
            amount,
        });
        return response.data;
    }

    async rollbackBonus(player, amount = 1) {
        const response = await axios.post(`${this.promotionSettings.endpoints.rollbackBonus}/${this.definition.id}`, {
            playerId: player.session.playerId,
            operatorId: player.session.operatorId,
            amount,
        });
        return response.data;
    }
}
