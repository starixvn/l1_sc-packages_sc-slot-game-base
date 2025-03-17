import { secureRandomRange, secureShuffle } from "sc-core-rng";
import SlotGameDefinition from "./../slot-game-definition";
import defaultDefinition from "./default-definition";

export default class BonusBoardGenerator {
    /**
     * @param {SlotGameDefinition} definition
     * @param {defaultDefinition} boardDefinition
     */
    constructor(definition, boardDefinition) {
        this.size = definition.bonusSize;
        this.totalPaylines = (boardDefinition ?? defaultDefinition).paylines.length;
        this.applyNewBonusCalculation = definition.applyNewBonusCalculation;
    }

    generate(betAmount, minRate, maxRate, numberOfPaylines) {
        let bonusBoard = [];
        const bonusRate = this.applyNewBonusCalculation
            ? secureRandomRange(...Object.values(this.calculateBonusRateRange(minRate, maxRate, numberOfPaylines)))
            : secureRandomRange(minRate, maxRate);
            
        for (let counter = 0; counter < this.size; counter++) {
            const amount = parseFloat((bonusRate * betAmount).toFixed(2));
            const bonus = { amount, picked: false };

            bonusBoard.push(bonus);
        }

        bonusBoard = secureShuffle(bonusBoard);
        bonusBoard = secureShuffle(bonusBoard);
        bonusBoard = secureShuffle(bonusBoard);

        return bonusBoard;
    }

    calculateBonusRateRange(minRate, maxRate, numberOfPaylines) {
        const paylinesRate = Math.max(numberOfPaylines - 2, 1);

        const min = Math.max((minRate / this.totalPaylines) * paylinesRate, 1);
        const max = Math.max((maxRate / this.totalPaylines) * paylinesRate, 3);

        return { min: Math.floor(parseFloat(min.toFixed(2))), max: Math.floor(parseFloat(max.toFixed(2))) };
    }
}
