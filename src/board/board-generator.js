import { securePickSet, secureShuffle } from "sc-core-rng";
import defaultDefinition from "./default-definition";
import difficulties from "./difficulties";
export default class BoardGenerator {
    /**
     * @param {defaultDefinition} boardDefinition
     */
    constructor(boardDefinition, gameData) {
        this.definition = boardDefinition ?? defaultDefinition;
        this.numberOfPaylines = this.definition.paylines.length;

        this.gameData = gameData;
    }

    generate(difficulty) {
        const { slotsConfig } = this.gameData.gameConfigs;
        return this.generateByStrategy(slotsConfig.symbolWeight?.[difficulty] ?? this.getFillingStrategy(difficulty));
    }


    generateByStrategy(fillingStrategy) {
        const board = [];
        for (const rowWeight of fillingStrategy) {
            const filledSymbols = rowWeight.reduce((result, repeat, symbol) => result.concat(Array(repeat).fill(symbol)), []);
            board.push(...securePickSet(filledSymbols, this.definition.numberOfColumns));
        }
        return this.shuffle(board);
    }

    shuffle(board, times = 3) {
        let shuffledBoard;
        for (let time = 0; time < times; time++) {
            shuffledBoard = secureShuffle(board);
        }

        return shuffledBoard;
    }

    getFillingStrategy(difficulty) {
        switch (difficulty) {
            case difficulties.hard:
                return this.definition.fillingStrategies.hard;
            case difficulties.medium:
                return this.definition.fillingStrategies.medium;
            default:
                return this.definition.fillingStrategies.easy;
        }
    }
}
