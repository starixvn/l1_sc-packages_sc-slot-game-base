export default class JackpotValidator {
    constructor(gameData, jackpotConfigsConsumer) {
        this.gameData = gameData;
        this.jackpotConfigsConsumer = jackpotConfigsConsumer;
    }

    canAccessJackpot(player) {
        const jackpotConfig = this.jackpotConfigsConsumer.getJackpotConfig(player.session.operatorId, player.session.siteName);

        return jackpotConfig && !player.session.disableJackpotGames;
    }

    canContributeJackpotPools(player, freeSpin) {
        const jackpotConfig = this.jackpotConfigsConsumer.getJackpotConfig(player.session.operatorId, player.session.siteName);

        if (this.canAccessJackpot(player)) {
            const { session } = player;
            const isTestCurrency = this.gameData.currencies.some((currency) => currency.name === session.currencyName && currency.isTest);

            return !freeSpin && (!isTestCurrency || !jackpotConfig.excludeTestCurrency);
        }

        return false;
    }

    canHitJackpot(player) {
        const jackpotConfig = this.jackpotConfigsConsumer.getJackpotConfig(player.session.operatorId, player.session.siteName);

        if (this.canAccessJackpot(player)) {
            const { session } = player;
            const isTestCurrency = this.gameData.currencies.some((currency) => currency.name === session.currencyName && currency.isTest);

            return !isTestCurrency || !jackpotConfig.excludeTestCurrency;
        }

        return false;
    }
}
