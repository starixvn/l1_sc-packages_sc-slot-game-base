export default class JackpotConfigsConsumer {
    constructor(gameData) {
        this.gameData = gameData;
    }

    getJackpotConfig(operatorId, siteName) {
        return this.gameData.jackpotConfigs.find(
            (config) => config.operatorId === operatorId && (config.siteNames.includes(siteName) || config.siteNames.length == 0)
        );
    }

    getJackpotConfigById(jpConfigId) {
        return this.gameData.jackpotConfigs.find((config) => config._id === jpConfigId);
    }
}
