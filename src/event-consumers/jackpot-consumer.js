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
     */
    constructor(definition, gameData, jackpotPublisher, logService, jackpotsRepository, jackpotValidator) {
        this.definition = definition;
        this.gameData = gameData;
        this.jackpotPublisher = jackpotPublisher;
        this.logService = logService;
        this.jackpotsRepository = jackpotsRepository;
        this.jackpotValidator = jackpotValidator;
    }

    async contribute(player, { totalAmount, roundId, rate, freeSpin }) {
        const contributedByMember = !!player.session;

        if (!contributedByMember || this.jackpotValidator.canContributeJackpotPools(player, freeSpin)) {
            const isSeparatePool = this.gameData.gameConfigs.slotsConfig.jackpotConfigs.find(
                (config) => config.operatorId === player.session.operatorId
            );
            const { pools } = this.gameData.gameConfigs.slotsConfig.jackpot;
            const poolConfigs = isSeparatePool ? this.getSiteJackpotPools(player) : pools;

            const baseTotalAmount = totalAmount * rate;

            const jackpotPrizes = Object.keys(poolConfigs);

            for (const prize of jackpotPrizes) {
                await this.contributeToPool({ baseTotalAmount, contributedByMember, prize, roundId, poolConfigs, isSeparatePool, player });
            }
        }
    }

    getSiteJackpotPools(player) {
        return this.gameData.gameConfigs.slotsConfig.jackpotConfigs.find(
            (config) => config.operatorId === player.session.operatorId && config.siteName === player.session.siteName
        )?.pools;
    }

    async contributeToPool({ baseTotalAmount, contributedByMember, prize, roundId, poolConfigs, isSeparatePool, player }) {
        const poolConfig = poolConfigs?.[prize];

        if (!poolConfig) {
            return;
        }

        const poolAdjustment = this.calculatePoolAdjustment({ contributedByMember, poolConfig, baseTotalAmount });

        const runningPoolFilter = {
            gameId: this.definition.id,
            prize: prize,
            winnerName: { $exists: false },
            createdAt: { $lte: roundId },
        };

        if (isSeparatePool) {
            Object.assign(runningPoolFilter, { offerOperator: player.session.operatorId, offerSite: player.session.siteName, isSeparatePool: true });
        }

        const latestJackpotPool = await this.jackpotsRepository.findOneAndUpdate(
            runningPoolFilter,
            {
                gameId: this.definition.id,
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

        this.jackpotPublisher.publishLatestPool({
            jackpotPool: {
                pool: prize,
                amount: latestJackpotPool.amount,
            },
            poolInfo: {
                isSeparatePool,
                operatorId: player.session.operatorId,
                siteName: player.session.siteName,
            },
        });
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
        const winningRatio = this.gameData.gameConfigs.slotsConfig.jackpot.winningRatio;
        const runningPoolFilter = this.getRunningPoolFilter(prize, roundId);
        const nearestRunningPoolOrder = {
            createdAt: -1,
        };
        const winnerAdjustment = this.getWinnerAdjustment({ winningRatio, player, roundId, exchangeRateId, rate, currency, operatorId });
        const winnerProjection = {
            _id: false,
            pool: true,
            winnerName: true,
            amount: true,
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

        await this.initializeNewPool(prize, roundId);

        if (!winningJackpot) {
            this.logService.logCritical(`Couldn't find any running jackpot pool associated with: ${JSON.stringify(runningPoolFilter)}`);

            return { amount: 0 };
        }

        winningJackpot.amount *= winningRatio;

        await this.jackpotPublisher.publishWinner(player.UID, { ...winningJackpot, pool: prize });

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
        };
    }

    getRunningPoolFilter(prize, roundId) {
        return {
            gameId: this.definition.id,
            prize,
            winnerName: { $exists: false },
            createdAt: { $lt: roundId },
        };
    }

    async initialize() {
        const { pools } = this.gameData.gameConfigs.slotsConfig.jackpot;

        if (pools === null || pools === undefined) {
            this.logService.logCritical(`NOT FOUND jackpot pools configurations of ${this.gameData.gameConfigs.name}`);
            return;
        }

        const roundId = this.gameData.roundId;
        const prizes = Object.keys(pools);

        await Promise.all(
            prizes.map(async (prize) => {
                const runningPoolFilter = {
                    gameId: this.definition.id,
                    prize: prize,
                    winnerName: { $exists: false },
                };
                const numberOfExistingPools = await this.jackpotsRepository.countDocuments(runningPoolFilter).exec();

                if (numberOfExistingPools === 0) {
                    await this.initializeNewPool(prize, roundId);
                    return;
                }

                this.logService.logCritical(`Found ${numberOfExistingPools} running jackpot pool for prize ${prize}`);
            })
        );
    }

    async initializeNewPool(prize, roundId) {
        const { pools } = this.gameData.gameConfigs.slotsConfig.jackpot;
        const initAmount = pools[prize].init;

        this.logService.log(`Init new jackpot prize ${prize} at round ${roundId}`);

        await this.jackpotsRepository.create({
            gameId: this.definition.id,
            gameName: this.definition.name,
            prize: prize,
            initAmount,
            amount: initAmount,
            createdAt: roundId,
            createdTime: new Date(),
        });
    }

    async getLatestRoundId() {
        const runningPoolFilter = {
            gameId: this.definition.id,
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
}
