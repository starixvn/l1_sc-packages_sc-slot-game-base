import { jackpotValidator } from "../../event-consumers/__tests__/stubs";
import JackpotPrizeGenerator from "../jackpot-prize-generator";

describe("JackpotGenerator", () => {
    let gameData;
    let jackpotSize;
    let generator;
    let player;
    let jackpotConfigsConsumer;

    beforeEach(() => {
        player = {
            session: {
                operatorId: "operator1",
                siteName: "site1",
            },
        };
        gameData = createStubGameData();
        jackpotSize = 6;

        // Create mock jackpotConfigsConsumer
        jackpotConfigsConsumer = {
            getJackpotConfig: jest.fn().mockReturnValue({
                pools: {
                    minor: { playerSettings: { alloc: 90 } },
                    major: { playerSettings: { alloc: 9 } },
                    grand: { playerSettings: { alloc: 1 } },
                },
            }),
        };

        generator = new JackpotPrizeGenerator({ jackpotSize }, gameData, jackpotValidator, jackpotConfigsConsumer);

        jest.spyOn(generator.chance, "weighted");
        jest.spyOn(generator.chance, "shuffle");
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should validate if player can hit jackpot", () => {
        // Act
        generator.generate(player);

        // Assert
        expect(generator.jackpotValidator.canHitJackpot).toHaveBeenCalledWith(player);
    });

    describe("when player can NOT hit jackpot", () => {
        it("should return empty board", () => {
            // Arrange
            jackpotValidator.canHitJackpot.mockReturnValue(false);

            // Act
            const result = generator.generate(player);

            // Assert
            expect(result).toBeArrayOfSize(0);
        });
    });

    describe("when player can hit jackpot", () => {
        beforeEach(() => {
            jackpotValidator.canHitJackpot.mockReturnValue(true);
        });

        it("should call weighted selection correct number of times", () => {
            // Act
            generator.generate(player);

            // Assert
            expect(generator.chance.weighted).toHaveBeenCalledTimes(jackpotSize);
        });

        it("should use correct prizes and weights for selection", () => {
            // Act
            generator.generate(player);

            // Assert
            expect(generator.chance.weighted).toHaveBeenCalledWith(["minor", "major", "grand"], [90, 9, 1]);
        });

        it("should return empty board when no jackpot configs exist", () => {
            // Arrange
            jackpotConfigsConsumer.getJackpotConfig.mockReturnValue(null);

            // Act
            const result = generator.generate(player);

            // Assert
            expect(result).toBeArrayOfSize(0);
        });

        it("should return empty board when no matching operator config exists", () => {
            // Arrange
            jackpotConfigsConsumer.getJackpotConfig.mockReturnValue(null);
            player.session.operatorId = "nonexistent";

            // Act
            const result = generator.generate(player);

            // Assert
            expect(result).toBeArrayOfSize(0);
        });

        it("should return empty board when site name doesn't match", () => {
            // Arrange
            jackpotConfigsConsumer.getJackpotConfig.mockReturnValue(null);
            player.session.siteName = "nonexistent-site";

            // Act
            const result = generator.generate(player);

            // Assert
            expect(result).toBeArrayOfSize(0);
        });

        it("should work with site-agnostic configurations", () => {
            // Arrange
            jackpotConfigsConsumer.getJackpotConfig.mockReturnValue({
                pools: {
                    minor: { playerSettings: { alloc: 90 } },
                    major: { playerSettings: { alloc: 9 } },
                    grand: { playerSettings: { alloc: 1 } },
                },
            });

            // Act
            const result = generator.generate(player);

            // Assert
            expect(result).toHaveLength(jackpotSize);
        });

        it("should shuffle board multiple times", () => {
            // Act
            generator.generate(player);

            // Assert
            expect(generator.chance.shuffle).toHaveBeenCalledTimes(3);
        });

        it("should maintain prize distribution after shuffling", () => {
            // Arrange
            generator.chance.weighted.mockReturnValue("minor");
            const expectedPrizes = Array(jackpotSize).fill("minor");

            // Act
            const result = generator.generate(player);

            // Assert
            expect(result).toEqual(expect.arrayContaining(expectedPrizes));
        });

        it("should handle zero allocation values", () => {
            // Arrange
            jackpotConfigsConsumer.getJackpotConfig.mockReturnValue({
                pools: {
                    minor: { playerSettings: { alloc: 0 } },
                    major: { playerSettings: { alloc: 9 } },
                    grand: { playerSettings: { alloc: 1 } },
                },
            });

            // Act
            const result = generator.generate(player);

            // Assert
            expect(result).toHaveLength(jackpotSize);
        });
    });
});

const createStubGameData = () => ({
    jackpotConfigs: [
        {
            operatorId: "operator1",
            siteNames: ["site1", "site2"],
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
        },
    ],
});
