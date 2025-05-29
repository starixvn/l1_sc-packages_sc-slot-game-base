import Chance from "chance";
import JackpotValidator from "../validators/jackpot-validator";
import SlotGameDefinition from "./../slot-game-definition";

export default class JackpotPrizeGenerator {
    /**
     * @param {SlotGameDefinition} definition
     * @param {SlotGameData} gameData
     * @param {JackpotValidator} jackpotValidator
     */
    constructor(definition, gameData, jackpotValidator, jackpotConfigsConsumer) {
        this.definition = definition;
        this.gameData = gameData;
        this.size = definition.jackpotSize ?? 10;
        this.jackpotValidator = jackpotValidator;
        this.jackpotConfigsConsumer = jackpotConfigsConsumer;

        this.chance = new Chance();
    }

    generate(player) {
        const jackpotConfig = this.jackpotConfigsConsumer.getJackpotConfig(player.session.operatorId, player.session.siteName);

        if (!this.jackpotValidator.canHitJackpot(player) || !jackpotConfig) {
            return [];
        }

        const { pools } = jackpotConfig;
        const prizes = Object.keys(pools);
        const weights = Object.values(pools).map((pool) => (pool.playerSettings.alloc > 0 ? pool.playerSettings.alloc : 1));

        let jackpotBoard = [];

        for (let counter = 0; counter < this.size; counter++) {
            jackpotBoard.push(this.chance.weighted(prizes, weights));
        }

        jackpotBoard = this.chance.shuffle(jackpotBoard);
        jackpotBoard = this.chance.shuffle(jackpotBoard);
        jackpotBoard = this.chance.shuffle(jackpotBoard);

        return jackpotBoard;
    }
}
