export default class JackpotValidator {
    constructor(gameData) {
        this.gameData = gameData;
    }

    canAccessJackpot(player) {
        const { jackpotConfigs } = this.gameData.gameConfigs.slotsConfig;

        const operatorJackpotConfig = jackpotConfigs.find((config) => config.operatorId === player.session.operatorId);
        const offerSites = operatorJackpotConfig?.siteNames;

        return (
            operatorJackpotConfig && (offerSites.length == 0 || offerSites.includes(player.session.siteName)) && !player.session.disableJackpotGames
        );
    }

    canContributeJackpotPools(player, freeSpin) {
        const { jackpot } = this.gameData.gameConfigs.slotsConfig;

        if (this.canAccessJackpot(player)) {
            const { session } = player;
            const isTestCurrency = this.gameData.currencies.some((currency) => currency.name === session.currencyName && currency.isTest);

            return !freeSpin && (!isTestCurrency || !jackpot.excludeTestCurrency);
        }

        return false;
    }

    canHitJackpot(player) {
        const { jackpot } = this.gameData.gameConfigs.slotsConfig;

        if (this.canAccessJackpot(player)) {
            const { session } = player;
            const isTestCurrency = this.gameData.currencies.some((currency) => currency.name === session.currencyName && currency.isTest);

            return !isTestCurrency || !jackpot.excludeTestCurrency;
        }

        return false;
    }
}
