import math from "lodash/math";
import mongoose from "mongoose";
import JackpotValidator from "../validators/jackpot-validator";
import { JackpotPublisher } from "./../event-publishers";
import SlotGameData from "./../slot-game-data";
import SlotGameDefinition from "./../slot-game-definition";

export default class JackpotConsumer {
    /**
     * @param {SlotGameDefinition} definition
     * @param {SlotGameData} gameData
     * @param {JackpotPublisher} jackpotPublisher
     * @param {logger} logService
     * @param {mongoose.Model} jackpotsRepository
     * @param {JackpotValidator} jackpotValidator
     * @param {JackpotConfigsConsumer} jackpotConfigsConsumer
     */
    constructor(definition, gameData, jackpotPublisher, logService, jackpotsRepository, jackpotValidator, jackpotConfigsConsumer) {
        this.definition = definition;
        this.gameData = gameData;
        this.jackpotPublisher = jackpotPublisher;
        this.logService = logService;
        this.jackpotsRepository = jackpotsRepository;
        this.jackpotValidator = jackpotValidator;
        this.jackpotConfigsConsumer = jackpotConfigsConsumer;
    }

    async contribute(player, { totalAmount, roundId, rate, freeSpin, contributedByMember = true }) {
        if (!contributedByMember || this.jackpotValidator.canContributeJackpotPools(player, freeSpin)) {
            const jackpotConfig = this.jackpotConfigsConsumer.getJackpotConfig(player.session.operatorId, player.session.siteName);
            const pools = jackpotConfig?.pools;
            const baseTotalAmount = totalAmount * rate;
            const jackpotPrizes = Object.keys(pools);

            for (const prize of jackpotPrizes) {
                await this.contributeToPool({ baseTotalAmount, contributedByMember, prize, roundId, jackpotConfig });
            }
        }
    }

    async contributeToPool({ baseTotalAmount, contributedByMember, prize, roundId, jackpotConfig }) {
        const poolConfig = jackpotConfig?.pools?.[prize];

        if (!poolConfig) {
            return;
        }

        const poolAdjustment = this.calculatePoolAdjustment({ contributedByMember, poolConfig, baseTotalAmount });

        const runningPoolFilter = {
            prize: prize,
            winnerName: { $exists: false },
            createdAt: { $lte: roundId },
            jackpotConfigId: jackpotConfig._id.toString(),
        };

        const latestJackpotPool = await this.jackpotsRepository.findOneAndUpdate(
            runningPoolFilter,
            {
                $inc: poolAdjustment,
            },
            {
                new: true,
                lean: true,
                fields: { _id: false, amount: true },
                sort: {
                    createdAt: -1,
                },
            }
        );

        this.jackpotPublisher.publishLatestPool(
            {
                pool: prize,
                amount: latestJackpotPool.amount,
            },
            { operatorId: jackpotConfig.operatorId, siteNames: jackpotConfig.siteNames }
        );
    }

    calculatePoolAdjustment({ contributedByMember, poolConfig, baseTotalAmount }) {
        const contributionRatio = contributedByMember ? poolConfig.playerSettings.contrib : poolConfig.botSettings.contrib;
        const contributionAmount = math.round(baseTotalAmount * contributionRatio, 4);

        return {
            amount: contributionAmount,
            byBots: contributedByMember ? 0 : contributionAmount,
            byMembers: contributedByMember ? contributionAmount : 0,
        };
    }

    async hit(player, { prize, roundId, exchangeRateId, rate, operatorId, currency }) {
        const jackpotConfig = this.jackpotConfigsConsumer.getJackpotConfig(operatorId, player.session.siteName);
        const winningRatio = jackpotConfig.winningRatio;

        const runningPoolFilter = this.getRunningPoolFilter(prize, roundId, jackpotConfig);
        const nearestRunningPoolOrder = {
            createdAt: -1,
        };
        const winnerAdjustment = this.getWinnerAdjustment({
            winningRatio,
            player,
            roundId,
            exchangeRateId,
            rate,
            currency,
            operatorId,
        });
        const winnerProjection = {
            _id: false,
            prize: true,
            winnerName: true,
            amount: true,
            exchangeRateId: true,
            hitTime: true,
        };
        const winningJackpot = await this.jackpotsRepository.findOneAndUpdate(
            runningPoolFilter,
            {
                $set: winnerAdjustment,
            },
            {
                new: true,
                lean: true,
                fields: winnerProjection,
                sort: nearestRunningPoolOrder,
            }
        );

        await this.initializeNewPool(prize, roundId, jackpotConfig);

        if (!winningJackpot) {
            this.logService.logCritical(`Couldn't find any running jackpot pool associated with: ${JSON.stringify(runningPoolFilter)}`);

            return { amount: 0 };
        }

        winningJackpot.amount *= winningRatio;

        await this.jackpotPublisher.publishWinner(player.UID, { ...winningJackpot, pool: prize }, jackpotConfig);

        return winningJackpot;
    }

    getWinnerAdjustment({ winningRatio, player, roundId, exchangeRateId, rate, currency, operatorId }) {
        return {
            winningRatio,
            winnerName: player.profile.name,
            winnerId: player.session?.playerId,
            hitAt: roundId,
            hitTime: new Date(),
            exchangeRateId,
            rate,
            currency,
            operatorId,
            siteName: player.session?.siteName,
        };
    }

    getRunningPoolFilter(prize, roundId, jackpotConfig) {
        return {
            prize,
            winnerName: { $exists: false },
            createdAt: { $lt: roundId },
            jackpotConfigId: jackpotConfig._id.toString(),
        };
    }

    async initialize() {
        const jackpotConfigs = this.gameData.jackpotConfigs;

        if (jackpotConfigs === null || jackpotConfigs === undefined) {
            this.logService.logCritical(`NOT FOUND jackpot pools configurations of ${this.gameData.gameConfigs.name}`);
            return;
        }

        const roundId = this.gameData.roundId;

        await Promise.all(
            jackpotConfigs.map(async (jackpotConfig) => {
                const prizes = Object.keys(jackpotConfig.pools);

                for (const prize of prizes) {
                    const runningPoolFilter = {
                        prize: prize,
                        winnerName: { $exists: false },
                        jackpotConfigId: jackpotConfig._id.toString(),
                    };
                    const numberOfExistingPools = await this.jackpotsRepository.countDocuments(runningPoolFilter).exec();

                    if (numberOfExistingPools === 0) {
                        await this.initializeNewPool(prize, roundId, jackpotConfig);
                        this.logService.logCritical(
                            `Initialized new jackpot pool for prize ${prize} jackpotConfigId ${jackpotConfig._id.toString()}`
                        );
                    }
                }
            })
        );
    }

    async initializeNewPool(prize, roundId, jackpotConfig) {
        const initAmount = jackpotConfig.pools[prize].init;

        this.logService.log(`Init new jackpot prize ${prize} at round ${roundId}`);

        await this.jackpotsRepository.create({
            prize: prize,
            initAmount,
            amount: initAmount,
            createdAt: roundId,
            createdTime: new Date(),
            jackpotConfigId: jackpotConfig._id.toString(),
        });
    }

    async getLatestRoundId() {
        const runningPoolFilter = {
            winnerName: { $exists: false },
        };

        const pool = await this.jackpotsRepository
            .findOne(runningPoolFilter, "createdAt", {
                sort: {
                    createdAt: -1,
                },
            })
            .lean()
            .exec();

        return pool ? pool.createdAt : 0;
    }

    async getRunningPools() {
        const runningPoolFilter = {
            winnerId: { $exists: false },
        };

        return await this.jackpotsRepository
            .find(runningPoolFilter, {
                _id: false,
                prize: true,
                jackpotConfigId: true,
                amount: true,
            })
            .lean()
            .exec();
    }
}
