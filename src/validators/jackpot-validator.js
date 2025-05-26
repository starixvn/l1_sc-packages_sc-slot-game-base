export default class JackpotValidator {
    constructor(gameData) {
        this.gameData = gameData;
    }

    canAccessJackpot(player) {
        const jackpotConfigs = this.gameData.jackpotConfigs;

        const operatorJackpotConfig = jackpotConfigs.find(
            (config) =>
                config.operatorId === player.session.operatorId &&
                (config.siteNames.length == 0 || config.siteNames.includes(player.session.siteName))
        );

        return operatorJackpotConfig && !player.session.disableJackpotGames;
    }

    canContributeJackpotPools(player, freeSpin) {
        const jackpotConfigs = this.gameData.jackpotConfigs;
        const operatorJackpotConfig = jackpotConfigs.find(
            (config) =>
                config.operatorId === player.session.operatorId &&
                (config.siteNames.length == 0 || config.siteNames.includes(player.session.siteName))
        );

        if (this.canAccessJackpot(player)) {
            const { session } = player;
            const isTestCurrency = this.gameData.currencies.some((currency) => currency.name === session.currencyName && currency.isTest);

            return !freeSpin && (!isTestCurrency || !operatorJackpotConfig.excludeTestCurrency);
        }

        return false;
    }

    canHitJackpot(player) {
        const jackpotConfigs = this.gameData.jackpotConfigs;
        const operatorJackpotConfig = jackpotConfigs.find(
            (config) =>
                config.operatorId === player.session.operatorId &&
                (config.siteNames.length == 0 || config.siteNames.includes(player.session.siteName))
        );

        if (this.canAccessJackpot(player)) {
            const { session } = player;
            const isTestCurrency = this.gameData.currencies.some((currency) => currency.name === session.currencyName && currency.isTest);

            return !isTestCurrency || !operatorJackpotConfig.excludeTestCurrency;
        }

        return false;
    }
}
