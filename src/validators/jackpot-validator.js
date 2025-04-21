export default class JackpotValidator {
    constructor(gameData) {
        this.gameData = gameData;
    }

    canAccessJackpot(player) {
        const { jackpot, jackpotConfigs } = this.gameData.gameConfigs.slotsConfig;

        const isSeparatePool = jackpotConfigs.some((config) => config.operatorId === player.session.operatorId);

        const jackpotConfig = jackpotConfigs.find(
            (config) => config.siteName === player.session.siteName && config.operatorId === player.session.operatorId
        );

        if (jackpot.enabled && (!isSeparatePool || jackpotConfig)) {
            return !player.session.disableJackpotGames;
        }

        return false;
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
