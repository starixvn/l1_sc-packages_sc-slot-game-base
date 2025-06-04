import PlaceBetConsumer from "../src/event-consumers/place-bet-consumer.js";

describe("PlaceBetConsumer Promotion Features (6.0.0)", () => {
    let consumer;
    let mockGameData;
    let mockDefinition;

    beforeEach(() => {
        mockGameData = {
            gameConfigs: {
                enabled: true,
            },
        };

        mockDefinition = {
            id: "test-slot-game",
        };

        consumer = new PlaceBetConsumer();
        consumer.gameData = mockGameData;
        consumer.definition = mockDefinition;
        consumer.getNoticeObj = jest.fn((errorCode) => ({ message: errorCode }));
    });

    describe("getPromotionBetAmount", () => {
        it("should calculate correct promotion amount using max paylines", () => {
            const player = { UID: "test-player" };
            const payload = {
                amount: 10,
            };

            const result = consumer.getPromotionBetAmount(player, payload);

            expect(result).toBe(250); // 10 * 25 max paylines
        });

        it("should return 0 for invalid payload", () => {
            const player = { UID: "test-player" };
            const payload = {};

            const result = consumer.getPromotionBetAmount(player, payload);

            expect(result).toBe(0);
        });

        it("should calculate promotion amount regardless of selected paylines", () => {
            const player = { UID: "test-player" };
            const payload = {
                betChoice: ["payline1"], // Only 1 payline selected
                amount: 5,
            };

            const result = consumer.getPromotionBetAmount(player, payload);

            expect(result).toBe(125); // 5 * 25 max paylines (not 5 * 1)
        });

        it("should handle different bet amounts correctly", () => {
            const player = { UID: "test-player" };
            const payload = {
                amount: 2,
            };

            const result = consumer.getPromotionBetAmount(player, payload);

            expect(result).toBe(50); // 2 * 25 max paylines
        });
    });

    describe("composePromotionValidationCriteria", () => {
        it("should return empty array when player has no promotion", () => {
            const player = {
                UID: "test-player",
                profile: { level: 10 },
            };

            const result = consumer.composePromotionValidationCriteria(player);

            expect(result).toEqual([]);
        });

        it("should validate BonusItemCount is greater than 0", () => {
            const player = {
                UID: "test-player",
                promotion: {
                    BonusItemCount: 0, // No bonus items
                },
            };

            const result = consumer.composePromotionValidationCriteria(player);

            const bonusItemFailure = result.find((criteria) => criteria.notice.message === "SB1961");
            expect(bonusItemFailure.failure).toBe(true);
        });

        it("should pass BonusItemCount validation when player has bonus items", () => {
            const player = {
                UID: "test-player",
                freeSpin: false,
                promotion: {
                    BonusItemCount: 5, // Has bonus items
                },
            };

            const result = consumer.composePromotionValidationCriteria(player);

            const bonusItemFailure = result.find((criteria) => criteria.notice.message === "SB1961");
            expect(bonusItemFailure.failure).toBe(false);
        });

        it("should validate no promotions during free spins", () => {
            const player = {
                UID: "test-player",
                freeSpin: true, // During free spin
                promotion: {
                    BonusItemCount: 5,
                },
            };

            const result = consumer.composePromotionValidationCriteria(player);

            const freeSpinFailure = result.find((criteria) => criteria.notice.message === "SB1962");
            expect(freeSpinFailure.failure).toBe(true);
        });

        it("should pass free spin validation when not in free spin", () => {
            const player = {
                UID: "test-player",
                freeSpin: false, // Not in free spin
                promotion: {
                    BonusItemCount: 5,
                },
            };

            const result = consumer.composePromotionValidationCriteria(player);

            const freeSpinFailure = result.find((criteria) => criteria.notice.message === "SB1962");
            expect(freeSpinFailure.failure).toBe(false);
        });

        it("should pass all validations for eligible player", () => {
            const player = {
                UID: "test-player",
                freeSpin: false,
                promotion: {
                    BonusItemCount: 10,
                    isActive: true,
                },
            };

            const result = consumer.composePromotionValidationCriteria(player);

            // Check that our slot-specific validations pass (the last 2 criteria)
            const slotSpecificCriteria = result.slice(-2);
            slotSpecificCriteria.forEach((criteria) => {
                expect(criteria.failure).toBe(false);
            });

            // Verify we have slot-specific validation codes
            expect(slotSpecificCriteria[0].notice.message).toBe("SB1961"); // BonusItemCount
            expect(slotSpecificCriteria[1].notice.message).toBe("SB1962"); // FreeSpin
        });

        it("should combine with base criteria when super method exists", () => {
            // Mock the super method
            const baseCriteria = [{ failure: false, notice: { message: "Base validation" } }];

            // Create a new instance to avoid polluting the main consumer
            const testConsumer = new PlaceBetConsumer();
            testConsumer.gameData = mockGameData;
            testConsumer.definition = mockDefinition;
            testConsumer.getNoticeObj = jest.fn((errorCode) => ({ message: errorCode }));

            // Mock super method on the specific instance
            jest.spyOn(Object.getPrototypeOf(Object.getPrototypeOf(testConsumer)), "composePromotionValidationCriteria").mockReturnValue(
                baseCriteria
            );

            const player = {
                UID: "test-player",
                freeSpin: false,
                promotion: {
                    BonusItemCount: 5,
                    isActive: true,
                },
            };

            const result = testConsumer.composePromotionValidationCriteria(player);

            // Should include both base and slot-specific criteria (3 total: 1 base + 2 slot-specific)
            expect(result.length).toBe(3);
            expect(result).toEqual(expect.arrayContaining(baseCriteria));
        });
    });
});
