import axios from "axios";

export default class Promotion {
    constructor(definition, appConfigs) {
        this.promotionSettings = appConfigs.promotionSettings;
        this.definition = definition;
        this.axios = axios.create({ baseURL: this.promotionSettings.url });
    }

    async getActivePromotions() {
        const response = await axios.get(`${this.promotionSettings.endpoints.activePromotions}/${this.definition.id}`);
        return response.data;
    }

    async getPlayerPromotions(player) {
        const response = await axios.get(`${this.promotionSettings.endpoints.playerPromotions}/${this.definition.id}/${player.session.playerId}`);
        return response.data;
    }

    async useBonus(player) {
        const response = await axios.post(`${this.promotionSettings.endpoints.useBonus}/${this.definition.id}`, {
            playerId: player.session.playerId,
            operatorId: player.session.operatorId,
        });
        return response.data;
    }

    async gainBonus(player, amount) {
        const response = await axios.post(`${this.promotionSettings.endpoints.giveBonus}/${this.definition.id}`, {
            playerId: player.session.playerId,
            operatorId: player.session.operatorId,
            amount,
        });
        return response.data;
    }

    async rollbackBonus(player, amount) {
        const response = await axios.post(`${this.promotionSettings.endpoints.rollbackBonus}/${this.definition.id}`, {
            playerId: player.session.playerId,
            operatorId: player.session.operatorId,
            amount,
        });
        return response.data;
    }
}
