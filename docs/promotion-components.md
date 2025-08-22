# Promotion System - Component Interactions

This document shows how components interact in the promotion system, organized by functional layers for better clarity.

## 🏗️ System Architecture Overview

```mermaid
flowchart TD
    subgraph "🎮 Client Layer"
        A[Player Request] --> B[in-game-consumer.js]
    end
    
    subgraph "🎯 Processing Layer" 
        C[place-bet-consumer.js] --> D[slot-process-bet-queue.js]
        D --> E[settle-game-round-consumer.js]
    end
    
    subgraph "🎁 Promotion Layer"
        F[slot-promotion-interceptor.js] --> G[promotion-free-spins-consumer.js]
    end
    
    subgraph "💫 Free Spins Layer"
        H[free-spins-consumer.js]
    end
    
    B --> C
    E --> F
    E --> H
    C --> H
    
    style A fill:#e3f2fd
    style C fill:#fff3e0
    style F fill:#fce4ec
    style H fill:#e8f5e8
```

## 📊 Core Data Flow

```mermaid
flowchart LR
    subgraph "📋 Data"
        A[player.promotion]
        B[freeSpinSet]
        C[betInfo]
    end
    
    subgraph "🔄 Validation"
        D[hasValidPromotion]
        E[validateFreeSpinEligibility]
    end
    
    subgraph "⚙️ Processing"
        F[handlePromotionLogic]
        G[useFreeSpin]
        H[gainFreeSpin]
    end
    
    subgraph "✅ Completion"
        I[shouldCompletePromotion]
        J[handleBonusInGame]
    end
    
    A --> D --> F
    B --> E --> G
    C --> F --> H
    H --> I --> J
    
    style A fill:#ffecb3
    style D fill:#e3f2fd
    style F fill:#e8f5e8
    style I fill:#fce4ec
```

## 🔄 Key Function Interactions

### Bet Processing Flow
```mermaid
graph TD
    A[place-bet-consumer] --> B[handlePromotionLogic]
    B --> C[getSoonestExpiredFreeSpinSet]
    C --> D[hasValidPromotion]
    D --> E[validateFreeSpinEligibility]
    
    style A fill:#e3f2fd
    style B fill:#e8f5e8
    style C fill:#f3e5f5
    style D fill:#fff3e0
    style E fill:#fce4ec
```

### Free Spin Lifecycle
```mermaid
graph TD
    A[Win Free Spins] --> B[gainFreeSpin]
    B --> C[updateFreeSpinCache]
    C --> D[updatePlayerPromotionFreeSpins]
    
    E[Use Free Spin] --> F[getSoonestExpiredFreeSpinSet]
    F --> G[useFreeSpin]
    G --> H[Database Update]
    
    style A fill:#e8f5e8
    style B fill:#f3e5f5
    style E fill:#fff3e0
    style F fill:#f3e5f5
```

### Promotion Completion
```mermaid
graph TD
    A[Settlement] --> B[processBonus]
    B --> C[beforeEvent]
    C --> D[shouldCompletePromotion]
    D --> E[handleBonusInGame]
    E --> F[Complete Promotion]
    
    style A fill:#fff3e0
    style B fill:#fce4ec
    style C fill:#e8f5e8
    style D fill:#f3e5f5
    style E fill:#e0f2f1
    style F fill:#ffecb3
```

## 🏗️ Layer Responsibilities

### 🎮 Client Layer
- **in-game-consumer.js**: Handles player requests and builds game payload
- **Purpose**: Interface between player and game system
- **Key Functions**: `buildPayload()`, `getAvailableFreeSpins()`

### 🎯 Processing Layer  
- **place-bet-consumer.js**: Validates and processes bet placement
- **slot-process-bet-queue.js**: Manages bet queue and promotion validation
- **settle-game-round-consumer.js**: Orchestrates game settlement
- **Purpose**: Core game logic and bet processing

### 🎁 Promotion Layer
- **slot-promotion-interceptor.js**: Manages promotion lifecycle
- **promotion-free-spins-consumer.js**: Handles promotion-specific bonuses
- **Purpose**: Promotion-specific logic and completion

### 💫 Free Spins Layer
- **free-spins-consumer.js**: Complete free spin lifecycle management
- **Purpose**: Free spin creation, usage, and expiry management

## 🔄 Key Interaction Patterns

### 1. **Top-Down Flow**
```
Player Request → Client Layer → Processing Layer → Promotion/Free Spins
```

### 2. **Data-Driven Validation**
```
Data Structures → Validation Functions → Processing Logic → Completion Check
```

### 3. **Cross-Layer Communication**
- **Processing ↔ Free Spins**: Bet processing triggers free spin usage/creation
- **Processing ↔ Promotion**: Settlement triggers promotion logic
- **Client ↔ Free Spins**: Client queries free spin availability

## 📊 Core Data Structures

```javascript
// Central promotion data
player.promotion = {
    promotionId: string,
    isClaimed: boolean,
    freeSpinAvailable: number,
    bonus: number,
    remainingBonusItems: number,
    endDate: Date
}

// Free spin set information  
freeSpinSet = {
    id: number,
    promotionId: string | null,
    available: number,
    expiryTime: Date,
    bet: number,
    paylines: array
}

// Bet information
betInfo = {
    freeSpin: boolean,
    amount: number,
    betChoice: array,
    totalAmount: number
}
```

## 🎯 Design Benefits

✅ **Clear Separation**: Each layer has distinct responsibilities  
✅ **Easy to Follow**: Linear flows instead of complex interconnections  
✅ **Maintainable**: Changes in one layer have minimal impact on others  
✅ **Testable**: Each flow can be tested independently 