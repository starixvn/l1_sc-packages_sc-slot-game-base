import mongoose from "mongoose";
import { getOrDefault } from "sc-game-base/src/core/game-management-api";

export default class HallOfFameQuery {
    /**
     * @param {Number} gameId
     * @param {mongoose.Model} famesRepository
     * @param {mongoose.Model} jackpotsRepository
     * @param {GameManagementApiClientFactory} gameManagementApiClientFactory
     * @param {GameData} gameData
     * @param {JackpotConfigsConsumer} jackpotConfigsConsumer
     */
    constructor(gameId, famesRepository, jackpotsRepository, gameManagementApiClientFactory, gameData, jackpotConfigsConsumer) {
        this.gameId = gameId;
        this.famesRepository = famesRepository;
        this.jackpotsRepository = jackpotsRepository;
        this.gameManagementApiClient = gameManagementApiClientFactory.instance();
        this.gameData = gameData;
        this.jackpotConfigsConsumer = jackpotConfigsConsumer;
    }

    async queryBigWinningWinners(player, page, pageSize = 10) {
        if (page < 1 || pageSize < 1) {
            return { bigWinningWinners: {} };
        }

        const { operatorId, siteName } = player.session;
        const jackpotConfig = this.jackpotConfigsConsumer.getJackpotConfig(operatorId, siteName);

        const filter = {
            operatorId: operatorId,
        };

        if (jackpotConfig?.siteNames?.length > 0) {
            filter.siteName = { $in: jackpotConfig.siteNames };
        }

        const numberOfSkippedWinners = (page - 1) * pageSize;
        const total = await this.famesRepository.countDocuments(filter).exec();
        const projection = {
            _id: false,
            time: true,
            name: true,
            totalAmount: true,
            baseTotalAmount: true,
            winningAmount: true,
            baseWinningAmount: true,
            freeSpin: true,
            rate: true,
            exchangeRateId: true,
        };

        const winners =
            (await this.famesRepository
                .find(filter, projection, { sort: { time: -1 }, skip: numberOfSkippedWinners, limit: pageSize })
                .lean()
                .exec()) ?? [];

        await this.updateExchangeRateCode(player, winners);

        return { bigWinningWinners: { winners, page, pageSize, total } };
    }

    async queryJackpotWinners(player, page, pageSize = 10) {
        const { operatorId, siteName } = player.session;

        if (page < 1 || pageSize < 1) {
            return { jackpotWinners: {} };
        }

        const jpConfigId = this.jackpotConfigsConsumer.getJackpotConfig(operatorId, siteName)?._id;

        const filter = {
            winnerName: { $exists: true },
            jackpotConfigId: jpConfigId,
        };

        const numberOfSkippedWinners = (page - 1) * pageSize;
        const total = await this.jackpotsRepository.countDocuments(filter).exec();
        const projection = {
            _id: false,
            hitTime: true,
            winnerName: true,
            pool: "$prize",
            amount: true,
            winningRatio: true,
            exchangeRateId: true,
        };
        const jackpotWinners = await this.jackpotsRepository
            .find(filter, projection, { sort: { hitTime: -1 }, skip: numberOfSkippedWinners, limit: pageSize })
            .lean()
            .exec();

        const winners = jackpotWinners.map((jackpotWinner) => {
            const winningAmount = jackpotWinner.amount * jackpotWinner.winningRatio;

            return {
                time: jackpotWinner.hitTime,
                name: jackpotWinner.winnerName,
                pool: jackpotWinner.pool,
                winningAmount,
                exchangeRateId: jackpotWinner.exchangeRateId,
            };
        });

        await this.updateExchangeRateCode(player, winners);

        return { jackpotWinners: { winners, page, pageSize, total } };
    }

    async updateExchangeRateCode(player, winners) {
        const exchangeRates = await this.getExchangeRates(winners.map((w) => w.exchangeRateId));
        const { session } = player;

        for (const winner of winners) {
            winner.exchangeRateCode = {
                [session.currencyCode]: parseFloat(exchangeRates.find((er) => winner.exchangeRateId === er.exId)?.code[session.currencyCode]),
            };
        }
    }

    async getExchangeRates(exIds) {
        return await getOrDefault(this.gameManagementApiClient.exchangeRates.getExchangeRatesByExIds(exIds), []);
    }
}
