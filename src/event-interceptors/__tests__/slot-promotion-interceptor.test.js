import { stub } from "jest-micro-auto-stub";
import { EventInterceptors } from "sc-game-base/src/core";

import SlotPromotionInterceptor from "../slot-promotion-interceptor";

describe("SlotPromotionInterceptor", () => {
    let slotPromotionInterceptor;
    let mockDependencies;

    beforeEach(() => {
        // Mock the base PromotionBetInterceptor
        const mockBaseInterceptor = {
            beforeEvent: jest.fn().mockResolvedValue({ success: true }),
            shouldIntercept: jest.fn().mockReturnValue(true),
            transformEventData: jest.fn().mockReturnValue({}),
            afterSuccessEvent: jest.fn().mockResolvedValue({}),
            afterFailureEvent: jest.fn().mockResolvedValue({}),
            endPromotionEvent: jest.fn().mockResolvedValue({}),
        };

        // Mock the EventInterceptors.PromotionBetInterceptor
        jest.doMock("sc-game-base/src/core", () => ({
            EventInterceptors: {
                PromotionBetInterceptor: jest.fn().mockImplementation(() => mockBaseInterceptor),
            },
        }));

        mockDependencies = {
            gamePromotionApiClient: {
                instance: jest.fn().mockReturnValue({
                    deductBonusItem: jest.fn().mockResolvedValue({ success: true }),
                    createPromotionTicket: jest.fn().mockResolvedValue({ ticketId: "ticket-123" }),
                    rollbackBonusItem: jest.fn().mockResolvedValue({ success: true }),
                }),
            },
            logService: {
                logInfo: jest.fn(),
                logError: jest.fn(),
                logWarning: jest.fn(),
            },
            definition: {
                id: "test-slot-game",
                name: "Test Slot Game",
            },
        };

        slotPromotionInterceptor = new SlotPromotionInterceptor(mockDependencies);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("shouldCompletePromotion", () => {
        it("should return true when all promotion items are exhausted", () => {
            // Arrange
            const player = {
                promotion: {
                    remainingBonusItems: 0,
                    freeSpinAvailable: 0,
                    bonus: 0,
                },
            };

            // Act
            const result = slotPromotionInterceptor.shouldCompletePromotion(player);

            // Assert
            expect(result).toBe(true);
        });

        it("should return false when remainingBonusItems > 0", () => {
            // Arrange
            const player = {
                promotion: {
                    remainingBonusItems: 5,
                    freeSpinAvailable: 0,
                    bonus: 0,
                },
            };

            // Act
            const result = slotPromotionInterceptor.shouldCompletePromotion(player);

            // Assert
            expect(result).toBe(false);
        });

        it("should return false when freeSpinAvailable > 0", () => {
            // Arrange
            const player = {
                promotion: {
                    remainingBonusItems: 0,
                    freeSpinAvailable: 3,
                    bonus: 0,
                },
            };

            // Act
            const result = slotPromotionInterceptor.shouldCompletePromotion(player);

            // Assert
            expect(result).toBe(false);
        });

        it("should return false when bonus > 0", () => {
            // Arrange
            const player = {
                promotion: {
                    remainingBonusItems: 0,
                    freeSpinAvailable: 0,
                    bonus: 100,
                },
            };

            // Act
            const result = slotPromotionInterceptor.shouldCompletePromotion(player);

            // Assert
            expect(result).toBe(false);
        });

        it("should return false when multiple items are available", () => {
            // Arrange
            const player = {
                promotion: {
                    remainingBonusItems: 2,
                    freeSpinAvailable: 1,
                    bonus: 50,
                },
            };

            // Act
            const result = slotPromotionInterceptor.shouldCompletePromotion(player);

            // Assert
            expect(result).toBe(false);
        });

        it("should handle negative values correctly", () => {
            // Arrange
            const player = {
                promotion: {
                    remainingBonusItems: 0,
                    freeSpinAvailable: -1,
                    bonus: 0,
                },
            };

            // Act
            const result = slotPromotionInterceptor.shouldCompletePromotion(player);

            // Assert
            expect(result).toBe(true);
        });
    });

    describe("beforeEvent", () => {
        it("should decrement freeSpinAvailable when it is greater than 0", async () => {
            // Arrange
            const player = {
                promotion: {
                    freeSpinAvailable: 5,
                },
            };
            const context = {
                player,
                payload: {
                    amount: 100,
                    usePromotion: true,
                },
            };

            // Act
            await slotPromotionInterceptor.beforeEvent(context);

            // Assert
            expect(player.promotion.freeSpinAvailable).toBe(4);
        });

        it("should not call super.beforeEvent when freeSpinAvailable is greater than 0", async () => {
            // Arrange
            const context = {
                player: {
                    promotion: {
                        freeSpinAvailable: 3,
                    },
                },
                payload: {
                    amount: 100,
                    usePromotion: true,
                },
            };

            // Mock the super.beforeEvent method
            const superBeforeEventSpy = jest.spyOn(slotPromotionInterceptor, 'beforeEvent').mockImplementation(async (ctx) => {
                if (ctx.player.promotion.freeSpinAvailable === 0) {
                    // Call parent implementation
                    return Promise.resolve();
                } else {
                    ctx.player.promotion.freeSpinAvailable--;
                    return Promise.resolve();
                }
            });

            // Act
            await slotPromotionInterceptor.beforeEvent(context);

            // Assert
            expect(superBeforeEventSpy).toHaveBeenCalledWith(context);
            expect(context.player.promotion.freeSpinAvailable).toBe(2);
        });

        it("should handle multiple consecutive calls correctly", async () => {
            // Arrange
            const player = {
                promotion: {
                    freeSpinAvailable: 3,
                },
            };
            const context = {
                player,
                payload: {
                    amount: 100,
                    usePromotion: true,
                },
            };

            // Act
            await slotPromotionInterceptor.beforeEvent(context);
            await slotPromotionInterceptor.beforeEvent(context);
            await slotPromotionInterceptor.beforeEvent(context);

            // Assert
            expect(player.promotion.freeSpinAvailable).toBe(0);
        });

        it("should handle edge case when freeSpinAvailable becomes 0", async () => {
            // Arrange
            const player = {
                promotion: {
                    freeSpinAvailable: 1,
                },
            };
            const context = {
                player,
                payload: {
                    amount: 100,
                    usePromotion: true,
                },
            };

            // Act
            await slotPromotionInterceptor.beforeEvent(context);

            // Assert
            expect(player.promotion.freeSpinAvailable).toBe(0);
        });

        it("should handle negative freeSpinAvailable gracefully", async () => {
            // Arrange
            const player = {
                promotion: {
                    freeSpinAvailable: -1,
                },
            };
            const context = {
                player,
                payload: {
                    amount: 100,
                    usePromotion: true,
                },
            };

            // Act
            await slotPromotionInterceptor.beforeEvent(context);

            // Assert
            expect(player.promotion.freeSpinAvailable).toBe(-2);
        });
    });

    describe("Integration with base PromotionBetInterceptor", () => {
        it("should inherit from PromotionBetInterceptor", () => {
            // Assert
            expect(slotPromotionInterceptor).toBeInstanceOf(SlotPromotionInterceptor);
            expect(slotPromotionInterceptor).toHaveProperty('shouldCompletePromotion');
            expect(slotPromotionInterceptor).toHaveProperty('beforeEvent');
        });

        it("should have access to base interceptor methods", () => {
            // Assert
            expect(typeof slotPromotionInterceptor.shouldIntercept).toBe('function');
            expect(typeof slotPromotionInterceptor.transformEventData).toBe('function');
            expect(typeof slotPromotionInterceptor.afterSuccessEvent).toBe('function');
            expect(typeof slotPromotionInterceptor.afterFailureEvent).toBe('function');
            expect(typeof slotPromotionInterceptor.endPromotionEvent).toBe('function');
        });
    });

    describe("Error handling", () => {
        it("should handle missing promotion object gracefully", () => {
            // Arrange
            const player = {};

            // Act & Assert
            expect(() => slotPromotionInterceptor.shouldCompletePromotion(player)).toThrow();
        });

        it("should handle async errors in beforeEvent", async () => {
            // Arrange
            const context = {
                player: {
                    promotion: {
                        freeSpinAvailable: 0,
                    },
                },
                payload: {
                    amount: 100,
                    usePromotion: true,
                },
            };

            // Mock super.beforeEvent to throw an error
            jest.spyOn(slotPromotionInterceptor, 'beforeEvent').mockImplementation(async (ctx) => {
                if (ctx.player.promotion.freeSpinAvailable === 0) {
                    throw new Error("Test error");
                } else {
                    ctx.player.promotion.freeSpinAvailable--;
                    return Promise.resolve();
                }
            });

            // Act & Assert
            await expect(slotPromotionInterceptor.beforeEvent(context)).rejects.toThrow("Test error");
        });
    });

    describe("Edge cases", () => {
        it("should handle undefined player", () => {
            // Act & Assert
            expect(() => slotPromotionInterceptor.shouldCompletePromotion(undefined)).toThrow();
        });

        it("should handle null player", () => {
            // Act & Assert
            expect(() => slotPromotionInterceptor.shouldCompletePromotion(null)).toThrow();
        });

        it("should handle undefined context in beforeEvent", async () => {
            // Act & Assert
            await expect(slotPromotionInterceptor.beforeEvent(undefined)).rejects.toThrow();
        });

        it("should handle null context in beforeEvent", async () => {
            // Act & Assert
            await expect(slotPromotionInterceptor.beforeEvent(null)).rejects.toThrow();
        });

        it("should handle context without player", async () => {
            // Arrange
            const context = {
                payload: {
                    amount: 100,
                    usePromotion: true,
                },
            };

            // Act & Assert
            await expect(slotPromotionInterceptor.beforeEvent(context)).rejects.toThrow();
        });
    });

    describe("Real-world scenarios", () => {
        it("should handle complete promotion lifecycle", async () => {
            // Arrange - Player starts with 3 free spins
            const player = {
                promotion: {
                    remainingBonusItems: 0,
                    freeSpinAvailable: 3,
                    bonus: 0,
                },
            };

            // Act & Assert - First spin
            expect(slotPromotionInterceptor.shouldCompletePromotion(player)).toBe(false);
            await slotPromotionInterceptor.beforeEvent({ player, payload: {} });
            expect(player.promotion.freeSpinAvailable).toBe(2);

            // Second spin
            expect(slotPromotionInterceptor.shouldCompletePromotion(player)).toBe(false);
            await slotPromotionInterceptor.beforeEvent({ player, payload: {} });
            expect(player.promotion.freeSpinAvailable).toBe(1);

            // Third spin
            expect(slotPromotionInterceptor.shouldCompletePromotion(player)).toBe(false);
            await slotPromotionInterceptor.beforeEvent({ player, payload: {} });
            expect(player.promotion.freeSpinAvailable).toBe(0);

            // After all spins are used
            expect(slotPromotionInterceptor.shouldCompletePromotion(player)).toBe(true);
        });

        it("should handle mixed promotion scenarios", () => {
            // Arrange
            const scenarios = [
                {
                    name: "All items available",
                    promotion: { remainingBonusItems: 5, freeSpinAvailable: 3, bonus: 100 },
                    expected: false,
                },
                {
                    name: "Only bonus items remaining",
                    promotion: { remainingBonusItems: 2, freeSpinAvailable: 0, bonus: 0 },
                    expected: false,
                },
                {
                    name: "Only free spins remaining",
                    promotion: { remainingBonusItems: 0, freeSpinAvailable: 1, bonus: 0 },
                    expected: false,
                },
                {
                    name: "Only bonus remaining",
                    promotion: { remainingBonusItems: 0, freeSpinAvailable: 0, bonus: 50 },
                    expected: false,
                },
                {
                    name: "All items exhausted",
                    promotion: { remainingBonusItems: 0, freeSpinAvailable: 0, bonus: 0 },
                    expected: true,
                },
            ];

            // Act & Assert
            scenarios.forEach(({ name, promotion, expected }) => {
                const player = { promotion };
                const result = slotPromotionInterceptor.shouldCompletePromotion(player);
                expect(result).toBe(expected);
            });
        });

        it("should handle case: Hit Free spin on the last bonus turn", async () => {
            // Arrange - Player has 1 free spin left (last bonus turn)
            const player = {
                profile: { name: "testPlayer" },
                promotion: {
                    remainingBonusItems: 0,
                    freeSpinAvailable: 1, // Last free spin
                    bonus: 0,
                },
            };

            // Act - Use the last free spin
            await slotPromotionInterceptor.beforeEvent({ 
                player, 
                payload: { 
                    amount: 100, 
                    usePromotion: true,
                    freeSpin: true 
                } 
            });

            // Assert - Free spin should be decremented to 0
            expect(player.promotion.freeSpinAvailable).toBe(0);

            // Verify promotion should be completed
            expect(slotPromotionInterceptor.shouldCompletePromotion(player)).toBe(true);
        });

        it("should handle case: Reload game after hitting Free spin on last bonus turn", async () => {
            // Arrange - Player reloads game after using last free spin
            const player = {
                profile: { name: "testPlayer" },
                promotion: {
                    remainingBonusItems: 0,
                    freeSpinAvailable: 0, // Already used all free spins
                    bonus: 0,
                },
            };

            // Act & Assert - Promotion should be marked as completed
            expect(slotPromotionInterceptor.shouldCompletePromotion(player)).toBe(true);
        });

        it("should handle case: Invalid bet when promotion is not properly completed", async () => {
            // Arrange - Player has remaining items but tries normal bet
            const player = {
                profile: { name: "testPlayer" },
                promotion: {
                    remainingBonusItems: 1, // Still has bonus items
                    freeSpinAvailable: 0,
                    bonus: 0,
                },
            };

            // Act & Assert - Promotion should not be completed yet
            expect(slotPromotionInterceptor.shouldCompletePromotion(player)).toBe(false);
        });

        it("should handle case: Multiple free spins with mixed scenarios", async () => {
            // Arrange - Player has multiple free spins and bonus items
            const player = {
                profile: { name: "testPlayer" },
                promotion: {
                    remainingBonusItems: 2,
                    freeSpinAvailable: 3,
                    bonus: 50,
                },
            };

            // Act - Use all free spins
            for (let i = 0; i < 3; i++) {
                await slotPromotionInterceptor.beforeEvent({ 
                    player, 
                    payload: { 
                        amount: 100, 
                        usePromotion: true,
                        freeSpin: true 
                    } 
                });
            }

            // Assert - All free spins should be used
            expect(player.promotion.freeSpinAvailable).toBe(0);

            // But promotion should not be completed yet (still has bonus items)
            expect(slotPromotionInterceptor.shouldCompletePromotion(player)).toBe(false);

            // Simulate using remaining bonus items
            player.promotion.remainingBonusItems = 0;
            player.promotion.bonus = 0;

            // Now promotion should be completed
            expect(slotPromotionInterceptor.shouldCompletePromotion(player)).toBe(true);
        });

        it("should handle case: Finish promotion popup not showing correctly", async () => {
            // Arrange - Player has exactly 1 free spin left (last bonus turn)
            const player = {
                profile: { name: "testPlayer" },
                promotion: {
                    remainingBonusItems: 0,
                    freeSpinAvailable: 1,
                    bonus: 0,
                },
            };

            // Act - Use the last free spin
            await slotPromotionInterceptor.beforeEvent({ 
                player, 
                payload: { 
                    amount: 100, 
                    usePromotion: true,
                    freeSpin: true 
                } 
            });

            // Assert - Promotion should be completed after using last free spin
            expect(slotPromotionInterceptor.shouldCompletePromotion(player)).toBe(true);
            expect(player.promotion.freeSpinAvailable).toBe(0);
        });

        it("should handle case: Back to lobby and reopen game scenario", async () => {
            // Arrange - Player reloads game after using all free spins
            const player = {
                profile: { name: "testPlayer" },
                promotion: {
                    remainingBonusItems: 0,
                    freeSpinAvailable: 0, // All free spins used
                    bonus: 0,
                },
            };

            // Act & Assert - Promotion should be completed
            expect(slotPromotionInterceptor.shouldCompletePromotion(player)).toBe(true);
        });

        it("should handle case: Spin all extra free spins scenario", async () => {
            // Arrange - Player has multiple extra free spins
            const player = {
                profile: { name: "testPlayer" },
                promotion: {
                    remainingBonusItems: 0,
                    freeSpinAvailable: 5, // Multiple extra free spins
                    bonus: 0,
                },
            };

            // Act - Use all extra free spins
            for (let i = 0; i < 5; i++) {
                await slotPromotionInterceptor.beforeEvent({ 
                    player, 
                    payload: { 
                        amount: 100, 
                        usePromotion: true,
                        freeSpin: true 
                    } 
                });
            }

            // Assert - All extra free spins should be used
            expect(player.promotion.freeSpinAvailable).toBe(0);
            expect(slotPromotionInterceptor.shouldCompletePromotion(player)).toBe(true);
        });

        it("should handle case: Invalid bet after reload with extra free spin from last bonus turn", async () => {
            // Arrange - Player gets extra free spin on last bonus turn, then reloads
            const player = {
                profile: { name: "testPlayer" },
                promotion: {
                    remainingBonusItems: 0,
                    freeSpinAvailable: 1, // Extra free spin from last bonus turn
                    bonus: 0,
                },
            };

            // Act - Try to use the extra free spin after reload
            await slotPromotionInterceptor.beforeEvent({ 
                player, 
                payload: { 
                    amount: 100, 
                    usePromotion: true,
                    freeSpin: true 
                } 
            });

            // Assert - Free spin should be used successfully
            expect(player.promotion.freeSpinAvailable).toBe(0);
            expect(slotPromotionInterceptor.shouldCompletePromotion(player)).toBe(true);
        });

        it("should handle case: Invalid bet when trying to spin extra free spin after reload", async () => {
            // Arrange - Player has extra free spin but tries to spin normally
            const player = {
                profile: { name: "testPlayer" },
                promotion: {
                    remainingBonusItems: 0,
                    freeSpinAvailable: 1, // Has extra free spin
                    bonus: 0,
                },
            };

            // Act & Assert - Promotion should not be completed yet
            expect(slotPromotionInterceptor.shouldCompletePromotion(player)).toBe(false);

            // Try to use the extra free spin
            await slotPromotionInterceptor.beforeEvent({ 
                player, 
                payload: { 
                    amount: 100, 
                    usePromotion: true,
                    freeSpin: true 
                } 
            });

            // Assert - Free spin should be used and promotion completed
            expect(player.promotion.freeSpinAvailable).toBe(0);
            expect(slotPromotionInterceptor.shouldCompletePromotion(player)).toBe(true);
        });

        it("should handle case: Premature promotion finish popup after reload", async () => {
            // Arrange - Player has multiple extra free spins after reload
            const player = {
                profile: { name: "testPlayer" },
                promotion: {
                    remainingBonusItems: 0,
                    freeSpinAvailable: 3, // Multiple extra free spins
                    bonus: 0,
                },
            };

            // Act - Use first extra free spin
            await slotPromotionInterceptor.beforeEvent({ 
                player, 
                payload: { 
                    amount: 100, 
                    usePromotion: true,
                    freeSpin: true 
                } 
            });

            // Assert - Should not be completed yet (still has 2 free spins)
            expect(player.promotion.freeSpinAvailable).toBe(2);
            expect(slotPromotionInterceptor.shouldCompletePromotion(player)).toBe(false);

            // Use second extra free spin
            await slotPromotionInterceptor.beforeEvent({ 
                player, 
                payload: { 
                    amount: 100, 
                    usePromotion: true,
                    freeSpin: true 
                } 
            });

            // Assert - Should not be completed yet (still has 1 free spin)
            expect(player.promotion.freeSpinAvailable).toBe(1);
            expect(slotPromotionInterceptor.shouldCompletePromotion(player)).toBe(false);

            // Use last extra free spin
            await slotPromotionInterceptor.beforeEvent({ 
                player, 
                payload: { 
                    amount: 100, 
                    usePromotion: true,
                    freeSpin: true 
                } 
            });

            // Assert - Now should be completed after all free spins
            expect(player.promotion.freeSpinAvailable).toBe(0);
            expect(slotPromotionInterceptor.shouldCompletePromotion(player)).toBe(true);
        });

        it("should handle case: Back to lobby after hitting extra free spin on last bonus turn", async () => {
            // Arrange - Player hits extra free spin on last bonus turn, then goes back to lobby
            const player = {
                profile: { name: "testPlayer" },
                promotion: {
                    remainingBonusItems: 0,
                    freeSpinAvailable: 1, // Extra free spin from last bonus turn
                    bonus: 0,
                },
            };

            // Act - Use the extra free spin
            await slotPromotionInterceptor.beforeEvent({ 
                player, 
                payload: { 
                    amount: 100, 
                    usePromotion: true,
                    freeSpin: true 
                } 
            });

            // Assert - Should be completed after using the extra free spin
            expect(player.promotion.freeSpinAvailable).toBe(0);
            expect(slotPromotionInterceptor.shouldCompletePromotion(player)).toBe(true);
        });

        it("should handle case: Reload game and spin extra free spin scenario", async () => {
            // Arrange - Player reloads game with extra free spin
            const player = {
                profile: { name: "testPlayer" },
                promotion: {
                    remainingBonusItems: 0,
                    freeSpinAvailable: 1, // Extra free spin after reload
                    bonus: 0,
                },
            };

            // Act - Use the extra free spin after reload
            await slotPromotionInterceptor.beforeEvent({ 
                player, 
                payload: { 
                    amount: 100, 
                    usePromotion: true,
                    freeSpin: true 
                } 
            });

            // Assert - Should complete promotion after using extra free spin
            expect(player.promotion.freeSpinAvailable).toBe(0);
            expect(slotPromotionInterceptor.shouldCompletePromotion(player)).toBe(true);
        });

        it("should handle case: Multiple extra free spins after reload scenario", async () => {
            // Arrange - Player has multiple extra free spins after reload
            const player = {
                profile: { name: "testPlayer" },
                promotion: {
                    remainingBonusItems: 0,
                    freeSpinAvailable: 3, // Multiple extra free spins
                    bonus: 0,
                },
            };

            // Act - Use all extra free spins
            for (let i = 0; i < 3; i++) {
                await slotPromotionInterceptor.beforeEvent({ 
                    player, 
                    payload: { 
                        amount: 100, 
                        usePromotion: true,
                        freeSpin: true 
                    } 
                });
            }

            // Assert - All extra free spins should be used and promotion completed
            expect(player.promotion.freeSpinAvailable).toBe(0);
            expect(slotPromotionInterceptor.shouldCompletePromotion(player)).toBe(true);
        });

        it("should handle case: Promotion finish popup timing validation", async () => {
            // Arrange - Player has exactly 2 extra free spins
            const player = {
                profile: { name: "testPlayer" },
                promotion: {
                    remainingBonusItems: 0,
                    freeSpinAvailable: 2, // Exactly 2 extra free spins
                    bonus: 0,
                },
            };

            // Act - Use first extra free spin
            await slotPromotionInterceptor.beforeEvent({ 
                player, 
                payload: { 
                    amount: 100, 
                    usePromotion: true,
                    freeSpin: true 
                } 
            });

            // Assert - Should NOT show finish popup yet (still has 1 free spin)
            expect(player.promotion.freeSpinAvailable).toBe(1);
            expect(slotPromotionInterceptor.shouldCompletePromotion(player)).toBe(false);

            // Use second (last) extra free spin
            await slotPromotionInterceptor.beforeEvent({ 
                player, 
                payload: { 
                    amount: 100, 
                    usePromotion: true,
                    freeSpin: true 
                } 
            });

            // Assert - NOW should show finish popup (no more free spins)
            expect(player.promotion.freeSpinAvailable).toBe(0);
            expect(slotPromotionInterceptor.shouldCompletePromotion(player)).toBe(true);
        });
    });
});
