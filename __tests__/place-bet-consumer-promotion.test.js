import PlaceBetConsumer from "../src/event-consumers/place-bet-consumer.js";
import SlotNoticeHelper from "../src/helpers/slot-notice-helper";

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
        it("should return amount directly", () => {
            const player = { UID: "test-player" };
            const payload = {
                amount: 10,
            };

            const result = consumer.getPromotionBetAmount(player, payload);

            expect(result).toBe(10); // chỉ trả về amount
        });

        it("should return undefined for invalid payload", () => {
            const player = { UID: "test-player" };
            const payload = {};

            const result = consumer.getPromotionBetAmount(player, payload);

            expect(result).toBeUndefined();
        });

        it("should return amount even if betChoice is set", () => {
            const player = { UID: "test-player" };
            const payload = {
                betChoice: ["payline1"],
                amount: 5,
            };

            const result = consumer.getPromotionBetAmount(player, payload);

            expect(result).toBe(5);
        });

        it("should handle different bet amounts correctly", () => {
            const player = { UID: "test-player" };
            const payload = {
                amount: 2,
            };

            const result = consumer.getPromotionBetAmount(player, payload);

            expect(result).toBe(2);
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

        it("should return criteria for promotion: fail if freeSpin true", () => {
            const player = {
                UID: "test-player",
                freeSpin: true,
                promotion: {
                    BonusItemCount: 5,
                },
            };

            const result = consumer.composePromotionValidationCriteria(player);
            const slotCriteria = result.find(
                c => c.notice.message === SlotNoticeHelper.promotionNotAvailableDuringFreeSpin
            );
            expect(slotCriteria).toBeDefined();
            expect(slotCriteria.failure).toBe(true);
        });

        it("should return criteria for promotion: pass if freeSpin false", () => {
            const player = {
                UID: "test-player",
                freeSpin: false,
                promotion: {
                    BonusItemCount: 5,
                },
            };

            const result = consumer.composePromotionValidationCriteria(player);
            const slotCriteria = result.find(
                c => c.notice.message === SlotNoticeHelper.promotionNotAvailableDuringFreeSpin
            );
            expect(slotCriteria).toBeDefined();
            expect(slotCriteria.failure).toBe(false);
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

            // Should include both base and slot-specific criteria (2 total: 1 base + 1 slot-specific)
            expect(result.length).toBe(2);
            expect(result).toEqual(expect.arrayContaining(baseCriteria));
        });
    });
});
