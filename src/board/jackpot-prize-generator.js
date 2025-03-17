import { securePickOne, secureShuffle } from "sc-core-rng";
import JackpotValidator from "../validators/jackpot-validator";
import SlotGameDefinition from "./../slot-game-definition";

export default class JackpotPrizeGenerator {
    /**
     * @param {SlotGameDefinition} definition
     * @param {SlotGameData} gameData
     * @param {JackpotValidator} jackpotValidator
     */
    constructor(definition, gameData, jackpotValidator) {
        this.definition = definition;
        this.gameData = gameData;
        this.size = definition.jackpotSize ?? 10;
        this.jackpotValidator = jackpotValidator;
    }

    generate(player) {
        if (!this.jackpotValidator.canHitJackpot(player)) {
            return [];
        }

        const { pools } = this.gameData.gameConfigs.slotsConfig.jackpot;
        const weightedPrizes = [];
        for (const [prize, settings] of Object.entries(pools)) {
            weightedPrizes.push(...Array(settings.playerSettings.alloc > 0 ? settings.playerSettings.alloc : 1).fill(prize));
        }

        let jackpotBoard = [];

        for (let counter = 0; counter < this.size; counter++) {
            jackpotBoard.push(securePickOne(weightedPrizes));
        }

        jackpotBoard = secureShuffle(jackpotBoard);
        jackpotBoard = secureShuffle(jackpotBoard);
        jackpotBoard = secureShuffle(jackpotBoard);

        return jackpotBoard;
    }
}
