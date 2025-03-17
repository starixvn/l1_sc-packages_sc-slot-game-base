import * as coreRNG from "sc-core-rng";
import { jackpotValidator } from "../../event-consumers/__tests__/stubs";
import JackpotPrizeGenerator from "../jackpot-prize-generator";

describe("JackpotGenerator", () => {
    let gameData;
    let jackpotSize;
    let generator;

    const player = "player1";

    beforeEach(() => {
        gameData = createStubGameData();
        jackpotSize = 6;
        generator = new JackpotPrizeGenerator({ jackpotSize }, gameData, jackpotValidator);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("always validate player can hit jackpot", () => {
        // Arrange
        jest.spyOn(generator.jackpotValidator, "canHitJackpot");

        // Act
        generator.generate(player);

        // Assert
        expect(generator.jackpotValidator.canHitJackpot).toHaveBeenCalledWith(player);
    });

    describe("when player can NOT hit jackpot", () => {
        it("should return empty board", () => {
            // Arrange
            jackpotValidator.canHitJackpot.mockReturnValueOnce(false);

            // Act
            const result = generator.generate(player);

            // Assert
            expect(result).toBeArrayOfSize(0);
        });
    });

    describe("when player can hit jackpot", () => {
        beforeEach(() => {
            jackpotValidator.canHitJackpot.mockReturnValueOnce(true);
        });

        it("should generate a board with the correct size", () => {

            // Act
            const result = generator.generate(player);

            // Assert
            expect(result).toHaveLength(jackpotSize);
        });

        it("should generate a board with valid prizes", () => {
            // Arrange
            const prizes = ["minor", "major", "grand"];

            // Act
            const result = generator.generate();

            // Assert
            result.forEach((prize) => {
                expect(prizes).toContain(prize);
            });
        });

        it("should shuffle the board three times", () => {
            // Arrange
            const spy = jest.spyOn(coreRNG, "secureShuffle");

            // Act
            generator.generate();

            // Assert
            expect(spy).toHaveBeenCalledTimes(3);
        });
    });
});

const createStubGameData = () => ({
    gameConfigs: {
        slotsConfig: {
            betLevels: [0.1, 1, 5],
            jackpot: {
                enabled: true,
                excludeTestCurrency: false,
                winningRatio: 0.98,
                pools: {
                    minor: {
                        init: 5000,
                        playerSettings: { contrib: 0.1, alloc: 90 },
                      
                    },
                    major: {
                        init: 25000,
                        playerSettings: { contrib: 0.15, alloc: 9 },
                    },
                    grand: {
                        init: 50000,
                        playerSettings: { contrib: 0.25, alloc: 1 },
                    },
                },
                allowedCurrency: "INH",
            },
        },
    },
});
