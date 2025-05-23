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
    }) {
        super(definition, gameData, gameManagementApiClientFactory);

        this.idCountersConsumer = idCountersConsumer;
        this.jackpotConsumer = jackpotConsumer;
        this.hallOfFameConsumer = hallOfFameConsumer;
        this.boardCheatingConsumer = boardCheatingConsumer;
        this.boardGenerator = boardGenerator;
        this.paylineCalculator = paylineCalculator;

        this.totalNumberOfTickets = 0;
        this.odds = {};
        this.bigWinRatio = 0;
        this.groupTracks = [];
        this.baseBots = [];
        this.betGroupRatio = [50, 30, 15, 5];
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
            const jackpotConfig = this.gameData.jackpotConfigs.find((jp) => jp._id === config.jackpotConfigId);

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
        const betLevelsConfigs = [...this.gameData.gameConfigs.slotsConfig?.betLevels] ?? [];

        this.totalNumberOfTickets = 0;
        this.odds = this.gameData.gameConfigs.slotsConfig?.icons ?? {};
        this.bigWinRatio = this.gameData.gameConfigs.slotsConfig?.bigWinRatio ?? 3;

        const ratios = [50, 30, 15, 5];

        const betLevelsPerGroup = Math.floor(betLevelsConfigs.length / ratios.length);

        this.groupTracks = ratios
            .map((ratio, index) => {
                const length = index === 0 ? betLevelsPerGroup + (betLevelsConfigs.length % ratios.length) : betLevelsPerGroup;
                return {
                    betLevels: betLevelsConfigs.splice(0, length),
                    ratio,
                    numberOfTickets: 0,
                };
            })
            .filter((x) => x.betLevels.length > 0);

        super.resetAllBotData();
    }

    async placeBet(bot) {
        await this.increaseRoundId();

        const jackpotConfig = this.gameData.jackpotConfigs.find(
            (config) =>
                config.operatorId === bot.session.operatorId && (config.siteNames.length === 0 || config.siteNames.includes(bot.session.siteName))
        );

        if (!jackpotConfig?.enabled) {
            return;
        }

        const name = bot.profile.name;
        const roundId = this.gameData.roundId;
        const paylines = this.randomizePaylines();
        const numberOfPaylines = paylines.length;
        const amount = this.getBetAmount();
        const totalAmount = amount * numberOfPaylines;
        const track = this.groupTracks.find((track) => track.betLevels.includes(amount));
        const generatedBoard = this.boardGenerator.generateForBots(jackpotConfig.enabled, track.ratio);
        const board = this.boardCheatingConsumer.consume(name, generatedBoard);
        const betResult = this.paylineCalculator.calculate(board, paylines, this.odds);
        const winningAmount = betResult.paylines.reduce((currentWinningAmount, payline) => currentWinningAmount + payline.odds * amount, 0);

        if (betResult.jackpotPayline >= 0) {
            const prize = this.chance.weighted(
                Object.keys(jackpotConfig.pools),
                Object.values(jackpotConfig.pools).map((pool) => pool.botSettings.alloc)
            );
            await this.jackpotConsumer.hit(bot, { prize, roundId, exchangeRateId: this.gameData.exchangeRates.exId, rate: this.botRate });
        }

        await this.jackpotConsumer.contribute(bot, { totalAmount, roundId, rate: this.botRate });

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

        this.adjustGroupTracks(amount);
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

    getBetAmount() {
        const ratiosPerGroup = this.groupTracks.map((track) => {
            return {
                betLevels: track.betLevels,
                underRatio: (track.numberOfTickets * 100) / this.totalNumberOfTickets < track.ratio,
            };
        });
        const underRatioGroups = this.chance.shuffle(ratiosPerGroup.filter((group) => group.underRatio));

        const selectedGroup = underRatioGroups.length > 0 ? underRatioGroups[0] : this.randomizeGroup();

        return this.chance.pickone(selectedGroup.betLevels);
    }

    randomizeGroup() {
        const randomIndex = this.chance.natural({ min: 0, max: this.groupTracks.length - 1 });

        return this.groupTracks[randomIndex];
    }

    adjustGroupTracks(betAmount) {
        const group = this.groupTracks.find((track) => track.betLevels.includes(betAmount));

        if (group) {
            group.numberOfTickets++;
        }

        this.totalNumberOfTickets++;
    }
}
