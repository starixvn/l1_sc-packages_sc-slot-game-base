import { helpers } from "sc-common";
import { Core } from "sc-game-base";

import defaultDefinition from "../board/default-definition";
import { MultipleCurrencyHelper } from "./../helpers";
import SlotNoticeHelper from "./../helpers/slot-notice-helper";

export default class PlaceBetConsumer extends Core.BaseEventConsumers.PlaceBetConsumer {
    composeBettingTimeValidationCriteria() {
        const gameConfigs = this.gameData.gameConfigs;

        return [
            {
                failure: !gameConfigs.enabled,
                notice: this.getNoticeObj(helpers.noticeHelper.placeBetNextRound),
            },
        ];
    }

    composeBetAmountValidationCriteria(player, betChoice, amount, freeSpin) {
        const betLevels = MultipleCurrencyHelper.getBetLevels(this.gameData, player);

        if (player.promotion && player.usePromotion) {
            return [
                {
                    failure: amount <= 0,
                    notice: this.getNoticeObj(SlotNoticeHelper.invalidStakeLevel),
                },
            ];
        }

        return [
            {
                failure: amount <= 0,
                notice: this.getNoticeObj(SlotNoticeHelper.invalidStakeLevel),
            },
            {
                failure: !freeSpin && !betLevels.includes(amount),
                notice: this.getNoticeObj(SlotNoticeHelper.invalidStakeLevel),
            },
        ];
    }

    composeBetChoiceValidationCriteria(betChoice) {
        return [];
    }

    getPromotionBetAmount(player, payload) {
        if (player.promotion && player.promotion.betLevel) {
            return player.promotion.betLevel;
        }
        return payload.amount;
    }

    composePromotionValidationCriteria(player) {
        const baseCriteria = super.composePromotionValidationCriteria(player) || [];

        if (player.promotion) {
            const slotSpecificCriteria = [
                {
                    failure: player.freeSpin,
                    notice: this.getNoticeObj(SlotNoticeHelper.promotionNotAvailableDuringFreeSpin),
                },
                {
                    failure: player.promotion.remainingBonusItems <= 0 && player.promotion.freeSpinAvailable <= 0,
                    notice: this.getNoticeObj(helpers.noticeHelper.invalidBet, { msg: "No promotions available" }),
                }
            ];

            return baseCriteria.concat(slotSpecificCriteria);
        }

        return baseCriteria;
    }

    consume(player, payload) {
        Object.assign(payload, {
            amount: payload.amount,
            freeBet: payload.freeBet ?? false,
            freeSpin: payload.freeSpin ?? false,
            betChoice: [...Object.keys(defaultDefinition.paylines)],
        });

        this.handlePromotionSlotGameLogic(player, payload);

        const { amount, betChoice, freeSpin, roundId } = payload;
        const name = player.profile.name;

        if (!this.validateBetRequest(player, betChoice, amount, freeSpin, roundId)) {
            return;
        }

        if (!this.gameData.ingame[name]) {
            const newPlayer = {
                name: player.profile.name,
                currency: player.session.currencyName,
                betTracks: {},
                betQueue: [],
                operatorId: player.session.operatorId,
            };

            this.gameData.ingame[name] = newPlayer;
        }

        this.gameData.ingame[name].betQueue.push({ player, payload });
    }
    
    handlePromotionSlotGameLogic(player, payload) {
        const currentDateTime = new Date();
        const freeSpinsOfPlayer = this.gameData.ingame[player.profile.name]?.freeSpins ?? [];
        const soonestExpiredFreeSpinSet = freeSpinsOfPlayer.find((freeSpin) => freeSpin.available > 0 && freeSpin.expiryTime > currentDateTime);
        const freeSpinExtra = soonestExpiredFreeSpinSet && soonestExpiredFreeSpinSet.promotionId ? true : false;
        
        if(freeSpinExtra || !soonestExpiredFreeSpinSet) {
            this.handlePromotionLogic(player, payload);
        }
    }
}
