import math from "lodash/math";
import { helpers } from "sc-common";
import { Core } from "sc-game-base";
import { FreeSpinsConsumer, SettleGameRoundConsumer } from "./../event-consumers";
import SlotNoticeHelper from "./../helpers/slot-notice-helper";
import SlotGameData from "./../slot-game-data";
import SlotGameDefinition from "./../slot-game-definition";

export default class SlotProcessBetQueue extends Core.Crons.ProcessBetQueue {
    /**
     * @param {SlotGameDefinition} definition
     * @param {SlotGameData} gameData
     * @param {Core.BaseEventPublishers.PlaceBetPublisher} placeBetPublisher
     * @param {FreeSpinsConsumer} freeSpinsConsumer
     * @param {SettleGameRoundConsumer} settleGameRoundConsumer
     * @param {placeBetApi} dependencies.placeBet
     * @param {logger} dependencies.logService
     * @param {mongoose.Model} dependencies.roundsRepository
     * @param {mongoose.Model} dependencies.betsRepository
     * @param {mongoose.Model} dependencies.betLogsRepository
     * @param {EventConsumers.IdCountersConsumer} dependencies.idCountersConsumer
     * @param {Array} dependencies.betEventInterceptors
     */
    constructor({
        definition,
        gameData,
        placeBetPublisher,
        freeSpinsConsumer,
        settleGameRoundConsumer,
        placeBet,
        logService,
        roundsRepository,
        betsRepository,
        betLogsRepository,
        idCountersConsumer,
        baseMetrics,
        jackpotValidator,
        gameManagementApiClientFactory,
        betEventInterceptors,
    }) {
        super({
            definition,
            gameData,
            placeBetPublisher,
            placeBet,
            logService,
            betsRepository,
            betLogsRepository,
            baseMetrics,
            gameManagementApiClientFactory,
            betEventInterceptors,
        });

        this.freeSpinsConsumer = freeSpinsConsumer;
        this.settleGameRoundConsumer = settleGameRoundConsumer;
        this.roundsRepository = roundsRepository;
        this.idCountersConsumer = idCountersConsumer;
        this.jackpotValidator = jackpotValidator;
    }

    async proceedBet(player, payload) {
        if (this.gameData.ingame[player.profile.name]?.finish) {
            this.placeBetPublisher.publishGameFailedBet(player.UID, { endBet: -1, notice: { errorCode: helpers.noticeHelper.cannotPlaceBet } });

            return;
        }

        const soonestExpiredFreeSpinSet = this.freeSpinsConsumer.getSoonestExpiredFreeSpinSet(player);
        // Validate and set free spin flags
        payload.freeSpin = this.validateFreeSpinEligibility(soonestExpiredFreeSpinSet, player, payload.freeSpin);
        if (this.hasValidPromotion(player)) {
            player.promotion.freeSpinAvailable = this.freeSpinsConsumer.getTotalPromotionAvaiableFreeSpins(player);
        }
        // Handle invalid free spin scenario
        if (payload.freeSpin && !this.hasValidFreeSpinSource(soonestExpiredFreeSpinSet, player)) {
            this.handleInvalidFreeSpin(player);
            return;
        }

        this.gameData.roundId = await this.idCountersConsumer.consume("round");
        const betInfo = await this.generateBetInfo(payload, soonestExpiredFreeSpinSet, player);

        await super.proceedBet(player, betInfo);
    }

    /**
     * Validates if the player is eligible for free spins
     * @param {Object|null} soonestExpiredFreeSpinSet - The soonest expired free spin set
     * @param {Object} player - The player object
     * @returns {boolean} - Whether the player is eligible for free spins
     */
    validateFreeSpinEligibility(soonestExpiredFreeSpinSet, player, freeSpin) {
        if (soonestExpiredFreeSpinSet != null) {
            return true;
        }

        const hasValidPromotion = this.hasValidPromotion(player);
        return hasValidPromotion && freeSpin;
    }

    /**
     * Checks if the player has a valid promotion
     * @param {Object} player - The player object
     * @returns {boolean} - Whether the player has a valid promotion
     */
    hasValidPromotion(player) {
        return player.promotion != null && player.promotion && player.promotion.isClaimed;
    }

    /**
     * Determines if this is an extra free spin
     * @param {Object|null} soonestExpiredFreeSpinSet - The soonest expired free spin set
     * @returns {boolean} - Whether this is an extra free spin
     */
    isFreeSpinExtra(soonestExpiredFreeSpinSet) {
        return soonestExpiredFreeSpinSet != null && soonestExpiredFreeSpinSet.promotionId != null;
    }

    /**
     * Checks if the player has a valid source for free spins
     * @param {Object|null} soonestExpiredFreeSpinSet - The soonest expired free spin set
     * @param {Object} player - The player object
     * @returns {boolean} - Whether the player has a valid free spin source
     */
    hasValidFreeSpinSource(soonestExpiredFreeSpinSet, player) {
        return soonestExpiredFreeSpinSet != null || this.hasValidPromotion(player);
    }

    /**
     * Handles the case when a player tries to use invalid free spins
     * @param {Object} player - The player object
     */
    handleInvalidFreeSpin(player) {
        this.placeBetPublisher.publishGameFailedBet(player.UID, {
            endBet: -1,
            notice: { errorCode: SlotNoticeHelper.invalidFreeSpin },
        });
    }

    async generateBetInfo(payload, freeSpinInfo, player) {
        const betInfo = { roundId: this.gameData.roundId, ...payload };
        const { slotsConfig } = this.gameData.gameConfigs;

        if (freeSpinInfo) {
            const { bet, paylines, xMode = 1 } = freeSpinInfo;
            betInfo.betChoice = paylines;
            betInfo.amount = bet;
            betInfo.xMode = xMode;
        } else {
            const isPromotionFreeSpin = payload.freeSpin && payload.promotionId;
            betInfo.xMode = isPromotionFreeSpin ? 1 : player.session.xMode;
            betInfo.amount = betInfo.amount / betInfo.xMode;
        }

        betInfo.totalAmount = math.round(betInfo.amount * betInfo.betChoice.length, 2);
        betInfo.contributionRate = this.getContributionRate(slotsConfig, player, payload);
        betInfo.contributionAmount = math.round(betInfo.contribtionRate * betInfo.totalAmount, 4);

        return betInfo;
    }

    getContributionRate(slotsConfig, player, payload) {
        const { pools } = slotsConfig.jackpot;
        let totalContributionRate = 0;

        if (this.jackpotValidator.canContributeJackpotPools(player, payload.freeSpin)) {
            Object.values(pools).forEach((pool) => {
                totalContributionRate += pool.playerSettings.contrib;
            });
            return totalContributionRate;
        }

        return 0;
    }

    formatApiBetInfo(payload) {
        return {
            amount: payload.freeSpin ? 0 : payload.totalAmount,
            gameId: this.definition.id,
            gameRoundId: payload.roundId,
            choiceId: 0,
            freeBet: payload.freeBet,
            freeSpin: payload.freeSpin,
            contributionRate: payload.contributionRate,
            contributionAmount: payload.contributionAmount,
        };
    }

    composeBettingTimeValidationCriteria(roundId) {
        return [];
    }

    async handleSuccessBet(player, balance, roundId, bet, applicableInterceptors) {
        if (bet.freeSpin) {
            await this.freeSpinsConsumer.useFreeSpin(player);
        }

        const rate = this.calculateCurrencyRate(player.session);

        await this.upsertBet(player, roundId, bet, rate, applicableInterceptors);
        this.notifyPlacingBetResult(player, balance, bet, rate);

        const { betWin, baseBetWin } = await this.settleGameRoundConsumer.settleRound(player, roundId);

        if (applicableInterceptors) {
            bet.roundId = roundId;
            bet.betWin = betWin;

            await this.executeInterceptorEvent("afterSuccessEvent", applicableInterceptors, {
                player,
                bet: {
                    roundId,
                    betWin,
                    baseBetWin,
                    amount: bet.totalAmount,
                    baseAmount: bet.totalAmount * rate,
                },
                balance,
            });
        }
    }

    async upsertBet(player, roundId, bet, rate, applicableInterceptors) {
        let newBet = {
            id: roundId,
            uid: player.UID,
            name: player.profile.name,
            freeBet: bet.freeBet,
            time: new Date(),
            paylines: bet.betChoice,
            freeSpin: bet.freeSpin,
            bet: bet.amount,
            totalAmount: bet.totalAmount,
            baseTotalAmount: bet.totalAmount * rate,
            rate: rate,
            exchangeRateId: this.gameData.exchangeRates.exId,
            appType: player.session.system,
            xMode: bet.xMode,
        };

        if (applicableInterceptors) {
            newBet = this.executeInterceptorTransform("enhanceBetRecord", applicableInterceptors, {
                betRecord: newBet,
                bet,
            });
        }

        if (this.jackpotValidator.canAccessJackpot(player)) {
            newBet.jackpotContribution = {
                contributionRate: bet.contributionRate,
                baseContributionAmount: math.round(bet.totalAmount * bet.contributionRate * rate, 4),
            };
        }

        if (player.session) {
            newBet.siteId = player.session.siteId;
            newBet.currency = player.session.currencyName;

            newBet.operatorId = player.session.operatorId;
            newBet.playerId = player.session.playerId;
            newBet.siteName = player.session.siteName;
        }

        await this.roundsRepository.create(newBet);
    }

    generatePlacingBetResult(player, balance, bet) {
        const { totalAmount, freeSpin } = bet;

        return {
            endBet: totalAmount,
            freeSpin,
            user: { ...balance },
        };
    }

    decreaseBetTracks(playerName, bet) {}
}
