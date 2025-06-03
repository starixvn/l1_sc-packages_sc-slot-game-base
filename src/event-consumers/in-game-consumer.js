import mongoose from "mongoose";
import { Core } from "sc-game-base";

import { MultipleCurrencyHelper } from "./../helpers";
import SlotGameData from "./../slot-game-data";
import SlotGameDefinition from "./../slot-game-definition";
import FreeSpinsConsumer from "./free-spins-consumer";

export default class InGameConsumer extends Core.BaseEventConsumers.InGameConsumer {
    /**
     * @param {Object} dependencies
     * @param {SlotGameDefinition} dependencies.definition
     * @param {SlotGameData} dependencies.gameData
     * @param {Core.QueryApis.RoundQuery} dependencies.roundQuery
     * @param {Core.BaseEventPublishers.BaseEventPublisher} dependencies.publisher
     * @param {FreeSpinsConsumer} dependencies.freeSpinsConsumer
     * @param {getBalanceApi} dependencies.getBalance
     * @param {mongoose.Model} dependencies.userInfosRepository
     * @param {mongoose.Model} dependencies.jackpotsRepository
     * @param {JackpotConfigsConsumer} dependencies.jackpotConfigsConsumer
     */
    constructor({
        definition,
        gameData,
        roundQuery,
        publisher,
        freeSpinsConsumer,
        getBalance,
        jackpotsRepository,
        jackpotValidator,
        gameManagementApiClientFactory,
        jackpotConfigsConsumer,
    }) {
        super(definition, gameData, roundQuery, publisher, getBalance, gameManagementApiClientFactory);

        this.freeSpinsConsumer = freeSpinsConsumer;
        this.jackpotsRepository = jackpotsRepository;
        this.jackpotValidator = jackpotValidator;
        this.jackpotConfigsConsumer = jackpotConfigsConsumer;
    }

    async buildPayload(realPlayer) {
        const { session } = realPlayer;
        const canAccessJackpot = this.jackpotValidator.canAccessJackpot(realPlayer);

        const gameConfigs = this.getSlotGameConfig(realPlayer, canAccessJackpot);
        const freeSpins = this.getAvailableFreeSpins(realPlayer);
        const jackpotPools = canAccessJackpot ? await this.getPools(realPlayer) : [];

        await this.getBalance(realPlayer, true);

        const user = await this.getUserInfo(realPlayer);

        const { rate, multiplier } = this.getExchangeRate(session);

        return {
            gameConfigs,
            jackpotPools,
            freeSpins,
            user: {
                ...user,
                rate,
                multiplier,
                disableJackpotGames: session.disableJackpotGames,
            },
        };
    }

    getSlotGameConfig(realPlayer, canAccessJackpot) {
        const betLevels = MultipleCurrencyHelper.getBetLevels(this.gameData, realPlayer);
        const defaultBetLevel = MultipleCurrencyHelper.getDefaultBetLevel(this.gameData, realPlayer);
        const { icons: odds } = this.gameData.gameConfigs.slotsConfig;
        const { operatorId, siteName } = realPlayer.session;
        const jackpotConfig = this.jackpotConfigsConsumer.getJackpotConfig(operatorId, siteName);

        return {
            betLevels,
            defaultBetLevel,
            odds,
            jackpot:
                canAccessJackpot && jackpotConfig
                    ? {
                          winningRatio: jackpotConfig.winningRatio,
                          pools: this.getJackpotPoolsConfig(jackpotConfig.pools),
                      }
                    : {},
        };
    }

    getJackpotPoolsConfig(pools) {
        const poolConfigs = [];

        Object.keys(pools).forEach((prize) => {
            const config = { pool: prize, contribute: pools[prize].playerSettings.contrib };
            poolConfigs.push(config);
        });

        return poolConfigs;
    }

    getAvailableFreeSpins(realPlayer) {
        const totalOfFreeSpins = this.freeSpinsConsumer.getTotalAvaiableFreeSpins(realPlayer);
        const soonestExpiredFreeSpinSet = this.freeSpinsConsumer.getSoonestExpiredFreeSpinSet(realPlayer) ?? { bet: 0, paylines: [] };

        return {
            total: totalOfFreeSpins,
            bet: soonestExpiredFreeSpinSet.bet,
            paylines: soonestExpiredFreeSpinSet.paylines,
        };
    }

    async getPools(realPlayer) {
        const { operatorId, siteName } = realPlayer.session;
        const jackpotConfig = this.jackpotConfigsConsumer.getJackpotConfig(operatorId, siteName);

        const runningPoolsFilter = {
            winnerName: { $exists: false },
            jackpotConfigId: jackpotConfig._id,
        };
        const projection = {
            _id: false,
            pool: "$prize",
            amount: true,
        };

        return this.jackpotsRepository.find(runningPoolsFilter, projection).lean().exec();
    }

    getExchangeRate(session) {
        const { exchangeRates } = this.gameData;
        const { multiplier, currencyCode } = session;
        const rate = exchangeRates.code[currencyCode] * multiplier;

        return { rate, multiplier };
    }
}
