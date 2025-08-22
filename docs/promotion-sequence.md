# Promotion Logic - Sequence Diagram

This diagram illustrates the time sequence of activities in a typical betting flow with promotion.

```mermaid
sequenceDiagram
    participant Player
    participant PlaceBetConsumer as place-bet-consumer
    participant ProcessBetQueue as slot-process-bet-queue
    participant FreeSpinsConsumer as free-spins-consumer
    participant SettleRoundConsumer as settle-game-round-consumer
    participant PromotionInterceptor as slot-promotion-interceptor
    participant PromotionFreeSpinsConsumer as promotion-free-spins-consumer
    participant InGameConsumer as in-game-consumer
    
    Player->>InGameConsumer: Request game data
    Note over InGameConsumer: buildPayload()
    InGameConsumer->>FreeSpinsConsumer: getAvailableFreeSpins()
    FreeSpinsConsumer->>InGameConsumer: Return free spin data with promotionId
    InGameConsumer->>Player: Return payload with promotion data
    
    Player->>PlaceBetConsumer: Place bet
    Note over PlaceBetConsumer: consume()
    PlaceBetConsumer->>PlaceBetConsumer: handlePromotionLogic()
    PlaceBetConsumer->>FreeSpinsConsumer: getSoonestExpiredFreeSpinSet()
    FreeSpinsConsumer->>PlaceBetConsumer: Return free spin set
    PlaceBetConsumer->>PlaceBetConsumer: updatePlayerPromotionFreeSpins()
    PlaceBetConsumer->>ProcessBetQueue: Add to bet queue
    
    ProcessBetQueue->>ProcessBetQueue: proceedBet()
    ProcessBetQueue->>FreeSpinsConsumer: getSoonestExpiredFreeSpinSet()
    FreeSpinsConsumer->>ProcessBetQueue: Return free spin set
    ProcessBetQueue->>ProcessBetQueue: hasValidPromotion()
    ProcessBetQueue->>ProcessBetQueue: validateFreeSpinEligibility()
    
    alt Free spin bet
        ProcessBetQueue->>FreeSpinsConsumer: useFreeSpin()
        Note over FreeSpinsConsumer: Decrease available count
        FreeSpinsConsumer->>FreeSpinsConsumer: Update DB and cache
    end
    
    ProcessBetQueue->>SettleRoundConsumer: settleRound()
    Note over SettleRoundConsumer: Generate and process results
    SettleRoundConsumer->>SettleRoundConsumer: generateRoundResult()
    
    alt Won free spins
        SettleRoundConsumer->>FreeSpinsConsumer: gainFreeSpin()
        Note over FreeSpinsConsumer: Create new free spin set
        FreeSpinsConsumer->>FreeSpinsConsumer: Create with promotionId if promotion active
        FreeSpinsConsumer->>FreeSpinsConsumer: updatePlayerPromotionFreeSpins()
    end
    
    alt Has bonus
        SettleRoundConsumer->>PromotionInterceptor: beforeEvent()
        PromotionInterceptor->>PromotionInterceptor: Check freeSpinAvailable
        alt Has free spins
            PromotionInterceptor->>PromotionInterceptor: Decrease freeSpinAvailable
        else No free spins
            PromotionInterceptor->>PromotionInterceptor: Call super.beforeEvent()
        end
        SettleRoundConsumer->>SettleRoundConsumer: processBonus()
        Note over SettleRoundConsumer: Update promotion bonus
    end
    
    SettleRoundConsumer->>SettleRoundConsumer: settleBets()
    Note over SettleRoundConsumer: Calculate final results
    
    alt Has promotion and bonus
        SettleRoundConsumer->>PromotionFreeSpinsConsumer: handleBonusInGame()
        Note over PromotionFreeSpinsConsumer: Process promotion bonus
        PromotionFreeSpinsConsumer->>PromotionFreeSpinsConsumer: Update promotion ticket via API
        SettleRoundConsumer->>PromotionInterceptor: endPromotionEvent()
        PromotionInterceptor->>PromotionInterceptor: shouldCompletePromotion()
        alt Should complete
            Note over PromotionInterceptor: remainingBonusItems=0 && freeSpinAvailable<=0 && bonus=0
            PromotionInterceptor->>PromotionInterceptor: Complete promotion
        end
    end
    
    SettleRoundConsumer->>Player: Return settlement result
    Note over Player: Game round completed
```

## Sequence Flow Explanation:

### 🎮 Game Initialization Phase
1. **Player requests game data** - InGameConsumer builds payload including promotion info
2. **Free spins data** - Retrieved and included in response with promotionId if applicable

### 🎲 Bet Placement Phase  
3. **Player places bet** - PlaceBetConsumer validates and processes
4. **Promotion logic handling** - Updates promotion free spins count
5. **Queue processing** - Bet added to processing queue

### ⚙️ Bet Processing Phase
6. **Bet validation** - ProcessBetQueue validates promotion and free spin eligibility
7. **Free spin usage** - If free spin bet, decreases available count
8. **Settlement initiation** - Triggers settlement process

### 🎰 Settlement Phase
9. **Result generation** - SettleRoundConsumer generates game results
10. **Free spins processing** - If won free spins, creates new free spin sets with promotion context
11. **Bonus processing** - If bonus won, processes through promotion interceptor

### 🎁 Promotion Bonus Phase
12. **Bonus handling** - PromotionFreeSpinsConsumer updates promotion ticket via API
13. **Promotion completion check** - Determines if promotion should be completed
14. **Final settlement** - Returns results to player

## Key Decision Points:

- **🔍 Promotion Validation**: Multiple validation checks at different stages
- **🎯 Free Spin Source**: Distinguishes between regular and promotion free spins  
- **⚡ Interceptor Logic**: PromotionInterceptor manages promotion lifecycle
- **🏁 Completion Logic**: Auto-completes promotion when conditions met

## Error Handling:

- Invalid promotion states result in failed bets
- API failures in promotion ticket updates are logged but don't block settlement
- Free spin validation prevents unauthorized usage

## Data Synchronization:

- **Cache Updates**: Free spin counts updated in both DB and memory cache
- **Promotion State**: Consistent across all components through shared player object
- **API Integration**: External promotion system kept in sync via API calls 