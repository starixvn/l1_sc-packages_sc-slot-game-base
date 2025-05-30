import { Core } from "sc-game-base";
import GameManagementApiClientFactory, { getOrDefault } from "sc-game-base/src/core/game-management-api";
import * as Board from "./../board";
import * as EventConsumers from "./../event-consumers";
import SlotGameData from "./../slot-game-data";
import SlotGameDefinition from "./../slot-game-definition";
import { helpers } from "sc-common";

export default class SlotGameBot extends Core.Crons.BaseBot {
    /**
     * @param {Object} dependencies
     * @param {SlotGameDefinition} dependencies.definition
     * @param {SlotGameData} dependencies.gameData
     * @param {EventConsumers.JackpotConsumer} dependencies.jackpotConsumer
     * @param {EventConsumers.IdCountersConsumer} dependencies.idCountersConsumer
     * @param {EventConsumers.HallOfFameConsumer} dependencies.hallOfFameConsumer
     * @param {EventConsumers.BoardCheatingConsumer} dependencies.boardCheatingConsumer
     * @param {Board.BoardGenerator} dependencies.boardGenerator
     * @param {Board.PaylineCalculator} dependencies.paylineCalculator
     * @param {GameManagementApiClientFactory} dependencies.gameManagementApiClientFactory
     * @param {RoundsRepository} dependencies.tmpRoundsRepository
     * @param {EventConsumers.JackpotConfigsConsumer} dependencies.jackpotConfigsConsumer
     */
    constructor({
        definition,
        gameData,
        jackpotConsumer,
        idCountersConsumer,
        hallOfFameConsumer,
        boardCheatingConsumer,
        boardGenerator,
        paylineCalculator,
        gameManagementApiClientFactory,
        tmpRoundsRepository,
        jackpotConfigsConsumer,
    }) {
        super(definition, gameData, gameManagementApiClientFactory);

        this.idCountersConsumer = idCountersConsumer;
        this.jackpotConsumer = jackpotConsumer;
        this.hallOfFameConsumer = hallOfFameConsumer;
        this.boardCheatingConsumer = boardCheatingConsumer;
        this.boardGenerator = boardGenerator;
        this.paylineCalculator = paylineCalculator;
        this.tmpRoundsRepository = tmpRoundsRepository;
        this.jackpotConfigsConsumer = jackpotConfigsConsumer;
        this.totalNumberOfTickets = 0;
        this.odds = {};
        this.bigWinRatio = 0;
        this.groupTracks = [];
        this.baseBots = [];
        this.botCurrency = "BOT";
    }

    async reset() {
        const configs = this.gameData.gameConfigs;

        if (configs.botenabled) {
            const botRatio = this.gameData.botConfigs.reduce((acc, config) => acc + helpers.configHelper.getMaxBotForCurrentHour(config), 0);

            if (this.currentBotRatio !== botRatio) {
                this.currentBotRatio = botRatio;

                this.totalBots = await getOrDefault(this.gameManagementApiClient.users.getTotalBots(), this.totalBots);

                this.maxNumberOfBots = Math.floor(this.totalBots * this.currentBotRatio);
                await this.updateBotList();
            }

            await this.processDisabledBots();

            this.bots = this.standardizeBots(this.chance.shuffle(this.baseBots));
        } else {
            await this.removeAllBots();
        }

        this.resetAllBotData();
    }

    async updateBotList() {
        this.baseBots = await getOrDefault(this.gameManagementApiClient.users.getAllBots(this.maxNumberOfBots, true), this.baseBots);
    }

    standardizeBots(bots) {
        const botConfigs = this.gameData.botConfigs;
        const botRatios = botConfigs.map((config) => {
            const jackpotConfig = this.jackpotConfigsConsumer.getJackpotConfigById(config.jackpotConfigId);

            return {
                session: {
                    operatorId: jackpotConfig.operatorId,
                    siteName: jackpotConfig.siteNames.length > 0 ? this.chance.pickone(jackpotConfig.siteNames) : "",
                },
                weight: helpers.configHelper.getMaxBotForCurrentHour(config),
            };
        });
        const sessions = botRatios.map((ratio) => ratio.session);
        const weights = botRatios.map((ratio) => ratio.weight);

        return bots.map((bot) => {
            return {
                UID: bot.id,
                profile: {
                    name: bot.name,
                },
                session: { ...this.chance.weighted(sessions, weights) },
            };
        });
    }

    resetAllBotData() {
        const jpConfigs = this.gameData.jackpotConfigs;

        this.totalNumberOfTickets = 0;
        this.odds = this.gameData.gameConfigs.slotsConfig?.icons ?? {};
        this.bigWinRatio = this.gameData.gameConfigs.slotsConfig?.bigWinRatio ?? 3;

        this.groupTracks = jpConfigs.reduce((acc, jpConfig) => {
            acc[jpConfig._id] = this.getJpConfigGroupTracks(jpConfig.botBetLevels);
            return acc;
        }, {});

        super.resetAllBotData();
    }

    getJpConfigGroupTracks(betLevelsConfigs = []) {
        const ratios = [50, 30, 15, 5];

        const betLevelsPerGroup = Math.floor(betLevelsConfigs.length / ratios.length);

        return ratios
            .map((ratio, index) => {
                const length = index === 0 ? betLevelsPerGroup + (betLevelsConfigs.length % ratios.length) : betLevelsPerGroup;
                return {
                    betLevels: betLevelsConfigs.splice(0, length),
                    ratio,
                    numberOfTickets: 0,
                };
            })
            .filter((x) => x.betLevels.length > 0);
    }

    async placeBet(bot) {
        await this.increaseRoundId();

        const jackpotConfig = this.jackpotConfigsConsumer.getJackpotConfig(bot.session.operatorId, bot.session.siteName);

        if (!jackpotConfig?.enabled || this.groupTracks[jackpotConfig._id].length === 0) {
            return;
        }

        const contributionRate = this.getContributionRate(jackpotConfig);
        const name = bot.profile.name;
        const roundId = this.gameData.roundId;
        const paylines = this.randomizePaylines();
        const numberOfPaylines = paylines.length;
        const amount = this.getBetAmount(jackpotConfig._id);
        const totalAmount = amount * numberOfPaylines;
        const track = this.groupTracks[jackpotConfig._id].find((track) => track.betLevels.includes(amount));
        const generatedBoard = this.boardGenerator.generateForBots(jackpotConfig.enabled, track.ratio);
        const board = this.boardCheatingConsumer.consume(name, generatedBoard);
        const betResult = this.paylineCalculator.calculate(board, paylines, this.odds);
        const winningAmount = betResult.paylines.reduce((currentWinningAmount, payline) => currentWinningAmount + payline.odds * amount, 0);
        const betTicket = this.getBet(bot, { betResult, amount, totalAmount, paylines, board, contributionRate, winningAmount });

        if (betResult.jackpotPayline >= 0) {
            const prize = this.chance.weighted(
                Object.keys(jackpotConfig.pools),
                Object.values(jackpotConfig.pools).map((pool) => pool.botSettings.alloc)
            );
            const hitResult = await this.jackpotConsumer.hit(bot, {
                prize,
                roundId,
                exchangeRateId: this.gameData.exchangeRates.exId,
                operatorId: bot.session.operatorId,
                rate: this.botRate,
            });

            betTicket.settlementResult.jackpot = {
                winningLine: betResult.jackpotPayline,
                winningAmount: hitResult.amount,
                winningPrize: prize,
                picked: true,
            };
        }

        await this.jackpotConsumer.contribute(bot, { totalAmount, roundId, rate: this.botRate, contributedByMember: false });

        if (totalAmount * this.bigWinRatio <= winningAmount) {
            await this.hallOfFameConsumer.add(bot, {
                roundId,
                bet: amount,
                totalAmount,
                baseTotalAmount: totalAmount * this.botRate,
                winningAmount,
                baseWinningAmount: winningAmount * this.botRate,
                numberOfPaylines,
                rate: this.botRate,
            });
        }

        this.adjustGroupTracks(amount, jackpotConfig._id);

        await this.tmpRoundsRepository.create(betTicket);
    }

    getBet(bot, { betResult, amount, totalAmount, paylines, board, contributionRate, winningAmount }) {
        const roundId = this.gameData.roundId;
        return {
            id: roundId,
            uid: bot.UID,
            name: bot.profile.name,
            siteId: bot.session.siteId,
            siteName: bot.session.siteName,
            bet: amount,
            totalAmount,
            baseTotalAmount: totalAmount * this.botRate,
            paylines,
            freeSpin: false,
            result: board,
            settlementResult: {
                winningPaylines:
                    betResult.jackpotPayline > 0
                        ? betResult.paylines.filter((payline) => payline.odds > 0 && payline.payline !== betResult.jackpotPayline)
                        : betResult.paylines.filter((payline) => payline.odds > 0),
            },
            jackpotContribution: {
                contributionRate,
                baseContributionAmount: totalAmount * contributionRate,
            },
            odds: this.odds,
            betWin: winningAmount,
            baseBetWin: winningAmount * this.botRate,
            paid: true,
            time: new Date(),
            endTime: new Date(),
            currency: this.botCurrency,
            rate: this.botRate,
            exchangeRateId: this.gameData.exchangeRates.exId,
            operatorId: bot.session.operatorId,
            playerId: bot.UID,
        };
    }

    getContributionRate(jackpotConfig) {
        const { pools } = jackpotConfig;
        let totalContributionRate = 0;

        Object.values(pools).forEach((pool) => {
            totalContributionRate += pool.botSettings.contrib;
        });
        return totalContributionRate;
    }

    async increaseRoundId() {
        await this.idCountersConsumer.consume("round");
        this.gameData.roundId++;
    }

    randomizePaylines() {
        const numberOfAvailablePaylines = this.boardGenerator.numberOfPaylines;
        const seeds = [...Array(numberOfAvailablePaylines).keys()];
        const numberOfPaylines = this.chance.natural({ min: 1, max: numberOfAvailablePaylines - 1 });

        return this.chance.pickset(seeds, numberOfPaylines);
    }

    getBetAmount(jackpotConfigId) {
        const ratiosPerGroup = this.groupTracks[jackpotConfigId].map((track) => {
            return {
                betLevels: track.betLevels,
                underRatio: (track.numberOfTickets * 100) / this.totalNumberOfTickets < track.ratio,
            };
        });
        const underRatioGroups = this.chance.shuffle(ratiosPerGroup.filter((group) => group.underRatio));

        const selectedGroup = underRatioGroups.length > 0 ? underRatioGroups[0] : this.randomizeGroup(jackpotConfigId);

        return this.chance.pickone(selectedGroup.betLevels);
    }

    randomizeGroup(jackpotConfigId) {
        const randomIndex = this.chance.natural({ min: 0, max: this.groupTracks[jackpotConfigId].length - 1 });

        return this.groupTracks[jackpotConfigId][randomIndex];
    }

    adjustGroupTracks(betAmount, jackpotConfigId) {
        const group = this.groupTracks[jackpotConfigId].find((track) => track.betLevels.includes(betAmount));

        if (group) {
            group.numberOfTickets++;
        }

        this.totalNumberOfTickets++;
    }
}
