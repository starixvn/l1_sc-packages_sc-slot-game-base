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
        //TODO: get bet level from promotion

        return payload.amount;
    }

    composePromotionValidationCriteria(player) {
        const baseCriteria = super.composePromotionValidationCriteria?.(player) || [];

        if (player.promotion) {
            const slotSpecificCriteria = [
                {
                    failure: player.freeSpin,
                    notice: this.getNoticeObj(SlotNoticeHelper.promotionNotAvailableDuringFreeSpin),
                },
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

        this.handlePromotionLogic(player, payload);

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
}
