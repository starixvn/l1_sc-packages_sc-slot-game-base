# Promotion System - Detailed Function Logic

This document provides detailed flowcharts for each key function in the promotion system, showing internal logic checks and conditions.

## 📋 Function Index

- [hasValidPromotion()](#hasvalidpromotion)
- [validateFreeSpinEligibility()](#validatefreespineligibility)
- [handlePromotionLogic()](#handlepromotionlogic)
- [getSoonestExpiredFreeSpinSet()](#getsoonestexpiredfreespinset)
- [useFreeSpin()](#usefreespin)
- [gainFreeSpin()](#gainfreespin)
- [shouldCompletePromotion()](#shouldcompletepromotion)

---

## hasValidPromotion()

**Location**: `slot-process-bet-queue.js`  
**Purpose**: Validates if player has a valid promotion

```mermaid
flowchart TD
    A[hasValidPromotion player] --> B{player.promotion not null?}
    B -->|No| C[❌ Return false]
    B -->|Yes| D{player.promotion is truthy?}
    D -->|No| E[❌ Return false]
    D -->|Yes| F{player.promotion.isClaimed equals true?}
    F -->|No| G[❌ Return false]
    F -->|Yes| H[✅ Return true]
    
    style C fill:#ffebee
    style E fill:#ffebee
    style G fill:#ffebee
    style H fill:#e8f5e8
```

**Logic Checks:**
1. `player.promotion != null` - Promotion object exists
2. `player.promotion` - Promotion is truthy (not false/empty)
3. `player.promotion.isClaimed` - Promotion has been claimed by player

---

## validateFreeSpinEligibility()

**Location**: `slot-process-bet-queue.js`  
**Purpose**: Determines if player is eligible for free spins

```mermaid
flowchart TD
    A[validateFreeSpinEligibility freeSpinSet player freeSpin] --> B{soonestExpiredFreeSpinSet not null?}
    B -->|Yes| C[✅ Return true<br/>Has valid free spin set]
    B -->|No| D[hasValidPromotion player]
    D --> E{hasValidPromotion equals true?}
    E -->|No| F[❌ Return false]
    E -->|Yes| G{freeSpin equals true?}
    G -->|No| H[❌ Return false]
    G -->|Yes| I[✅ Return true<br/>Valid promotion + freeSpin requested]
    
    style C fill:#e8f5e8
    style F fill:#ffebee
    style H fill:#ffebee
    style I fill:#e8f5e8
```

**Logic Priority:**
1. **Free Spin Set Available** → Always eligible
2. **No Free Spin Set** → Check promotion + freeSpin flag
3. **Valid Promotion + freeSpin=true** → Eligible
4. **Otherwise** → Not eligible

---

## handlePromotionLogic()

**Location**: `place-bet-consumer.js`  
**Purpose**: Processes promotion logic during bet placement

```mermaid
flowchart TD
    A[handlePromotionLogic player payload] --> B[Get current date/time]
    B --> C[Get player free spins array]
    C --> D["Find soonest expired free spin set<br/>available greater than 0 AND not expired"]
    
    D --> E{soonestExpiredFreeSpinSet found?}
    E -->|Yes| F{soonestExpiredFreeSpinSet.promotionId exists?}
    E -->|No| G[freeSpinExtra = false]
    
    F -->|Yes| H[freeSpinExtra = true]
    F -->|No| I[freeSpinExtra = false]
    
    G --> J{player.promotion exists?}
    H --> J
    I --> J
    
    J -->|Yes| K[updatePlayerPromotionFreeSpins]
    J -->|No| L{payload.freeSpin == true?}
    
    K --> M{payload.freeSpin == true?}
    M -->|Yes| N{freeSpinExtra OR no soonestExpiredFreeSpinSet?}
    M -->|No| O[player.usePromotion = false]
    
    N -->|Yes| P[super.handlePromotionLogic]
    N -->|No| Q[player.usePromotion = false]
    
    L -->|Yes| R{freeSpinExtra OR no soonestExpiredFreeSpinSet?}
    L -->|No| S[End function]
    
    R -->|Yes| T[super.handlePromotionLogic]
    R -->|No| U[player.usePromotion = false]
    
    style P fill:#e8f5e8
    style T fill:#e8f5e8
    style O fill:#fff3e0
    style Q fill:#fff3e0
    style U fill:#fff3e0
```

**Key Logic:**
1. **Find Active Free Spins** - Gets unexpired free spin sets
2. **Detect Promotion Free Spins** - Checks if free spins have promotionId
3. **Update Promotion Data** - Syncs free spin availability
4. **Determine Usage** - Decides whether to use promotion logic

---

## getSoonestExpiredFreeSpinSet()

**Location**: `free-spins-consumer.js`  
**Purpose**: Retrieves the free spin set that will expire soonest

```mermaid
flowchart TD
    A[getSoonestExpiredFreeSpinSet player] --> B[Get current date/time]
    B --> C["Get player free spins array<br/>default to empty array"]
    C --> D["Find first free spin where:<br/>available greater than 0 AND not expired"]
    D --> E{Free spin found?}
    E -->|Yes| F[✅ Return free spin set]
    E -->|No| G[❌ Return null]
    
    style F fill:#e8f5e8
    style G fill:#ffebee
```

**Search Criteria:**
- `available > 0` - Has remaining spins
- `expiryTime > currentDateTime` - Not expired
- **First match** - Array is sorted by expiry time (soonest first)

---

## useFreeSpin()

**Location**: `free-spins-consumer.js`  
**Purpose**: Consumes one free spin and updates database

```mermaid
flowchart TD
    A[useFreeSpin player] --> B[getSoonestExpiredFreeSpinSet player]
    B --> C{firstAvailableFreeSpinSet exists?}
    C -->|No| D[❌ End - No free spins available]
    C -->|Yes| E["Update database:<br/>decrease available count by 1"]
    E --> F[await database update]
    F --> G["Update memory cache:<br/>decrease available count"]
    G --> H[✅ Free spin consumed successfully]
    
    style D fill:#ffebee
    style H fill:#e8f5e8
```

**Operations:**
1. **Find Available** - Gets soonest expiring free spin set
2. **Database Update** - Atomic decrement of available count
3. **Cache Update** - Sync memory cache with database
4. **Dual Update** - Ensures consistency between DB and cache

---

## gainFreeSpin()

**Location**: `free-spins-consumer.js`  
**Purpose**: Creates new free spin set when player wins free spins

```mermaid
flowchart TD
    A[gainFreeSpin player roundInfo timeToLive] --> B["Create timestamps:<br/>createdTime = now<br/>expiryTime = now + timeToLive"]
    B --> C[Increment free spin ID counter]
    C --> D{player.usePromotion == true?}
    
    D -->|Yes| E["Set expiry = player.promotion.endDate<br/>Add promotionId to free spin"]
    D -->|No| F["Set expiry = calculated expiryTime<br/>No promotionId"]
    
    E --> G["Create free spin record with:<br/>- ID, roundId, bet, paylines<br/>- total, available, timestamps<br/>- promotionId if promotion"]
    F --> G
    
    G --> H[Save to database]
    H --> I{Database save successful?}
    I -->|No| J[❌ Creation failed]
    I -->|Yes| K[updateFreeSpinCache memberName newFreeSpin]
    K --> L[updatePlayerPromotionFreeSpins player newFreeSpin]
    L --> M[✅ Free spin set created successfully]
    
    style J fill:#ffebee
    style M fill:#e8f5e8
```

**Key Features:**
- **Promotion Integration** - Links to active promotion if applicable
- **Expiry Management** - Uses promotion end date or calculated TTL
- **Dual Storage** - Updates both database and memory cache
- **ID Management** - Increments global free spin counter

---

## shouldCompletePromotion()

**Location**: `slot-promotion-interceptor.js`  
**Purpose**: Determines if promotion should be marked as complete

```mermaid
flowchart TD
    A[shouldCompletePromotion player] --> B{remainingBonusItems equals 0?}
    B -->|No| C[❌ Return false<br/>Still has bonus items]
    B -->|Yes| D{freeSpinAvailable less than or equal 0?}
    D -->|No| E[❌ Return false<br/>Still has free spins]
    D -->|Yes| F{bonus equals 0?}
    F -->|No| G[❌ Return false<br/>Still has pending bonus]
    F -->|Yes| H[✅ Return true<br/>All promotion items consumed]
    
    style C fill:#ffebee
    style E fill:#ffebee
    style G fill:#ffebee
    style H fill:#e8f5e8
```

**Completion Criteria (ALL must be true):**
1. `remainingBonusItems === 0` - No bonus items left
2. `freeSpinAvailable <= 0` - No free spins remaining
3. `bonus === 0` - No pending bonus amount

**Logic**: Uses **AND** condition - ALL criteria must be met for completion.

---

## 🔧 Function Interaction Flow

```mermaid
graph LR
    A[handlePromotionLogic] --> B[getSoonestExpiredFreeSpinSet]
    B --> C[validateFreeSpinEligibility]
    C --> D[hasValidPromotion]
    
    E[Bet Processing] --> F[useFreeSpin]
    F --> B
    
    G[Game Win] --> H[gainFreeSpin]
    H --> I[updatePlayerPromotionFreeSpins]
    
    J[Settlement] --> K[shouldCompletePromotion]
    
    style A fill:#e3f2fd
    style E fill:#f3e5f5
    style G fill:#e8f5e8
    style J fill:#fff3e0
```

## 🎯 Error Handling Patterns

### Null Checks
- All functions validate input parameters
- Graceful degradation when data is missing
- Default to safe states (false/null returns)

### Database Consistency
- Atomic operations for critical updates
- Cache synchronization after DB operations
- Transaction-like behavior where possible

### State Validation
- Multiple validation layers
- Early returns for invalid states
- Clear error indicators in return values 