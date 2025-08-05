# Promotion System Architecture Documentation

This documentation provides comprehensive diagrams and explanations of the promotion system in the slot game codebase.

## 📊 Documentation Overview

### 🎯 [High-Level Overview](./promotion-overview.md)
Bird's-eye view of the promotion system focusing on major phases and business logic.

**Key Features:**
- System phases (Initialization, Bet Processing, Game Execution, Settlement)
- Key decision points and flow characteristics
- Business logic abstraction
- User experience perspective

### 🔄 [Main Flow Diagram](./promotion-main-flow.md)
Complete end-to-end flow showing how promotion logic works from bet placement to settlement.

**Key Features:**
- Bet placement validation
- Free spin management
- Promotion bonus processing
- Settlement and completion logic

### 🏗️ [Component Interactions](./promotion-components.md) 
Component-level view showing how different modules interact with each other.

**Key Features:**
- Data structure relationships
- Method dependencies
- Integration points between components

### ⏱️ [Sequence Diagram](./promotion-sequence.md)
Time-based sequence showing the order of operations in a promotion-enabled betting session.

**Key Features:**
- Chronological flow of events
- Inter-component communication
- Decision points and error handling

### 🔍 [Detailed Function Logic](./promotion-detailed-logic.md)
In-depth analysis of each key function with internal logic checks and conditions.

**Key Features:**
- Function-level flowcharts
- Logic validation steps
- Error handling patterns
- Parameter validation flows

## 🎯 System Components

### Core Files
- `slot-process-bet-queue.js` - Main bet processing logic
- `place-bet-consumer.js` - Bet validation and queue management
- `free-spins-consumer.js` - Free spin lifecycle management
- `settle-game-round-consumer.js` - Game settlement orchestration

### Promotion-Specific Files  
- `promotion-free-spins-consumer.js` - Promotion bonus handling
- `slot-promotion-interceptor.js` - Promotion lifecycle management
- `in-game-consumer.js` - Client data preparation

## 🔑 Key Concepts

### Promotion Data Structure
```javascript
player.promotion = {
    promotionId: string,
    isClaimed: boolean,
    freeSpinAvailable: number,
    bonus: number,
    remainingBonusItems: number,
    endDate: Date
}
```

### Free Spin Set Structure
```javascript
freeSpinSet = {
    id: number,
    promotionId: string | null,
    available: number,
    expiryTime: Date,
    bet: number,
    paylines: array
}
```

## 🚀 Quick Start

1. **Business Overview**: Start with [High-Level Overview](./promotion-overview.md) for business logic understanding
2. **Technical Flow**: Review [Main Flow Diagram](./promotion-main-flow.md) for complete technical flow
3. **Component Architecture**: Study [Component Interactions](./promotion-components.md) for system architecture
4. **Implementation Timing**: Check [Sequence Diagram](./promotion-sequence.md) for execution order
5. **Function Details**: Dive into [Detailed Function Logic](./promotion-detailed-logic.md) for specific implementations

### 📚 Reading Path by Role

**🏢 Business Analysts / Product Managers:**
- [High-Level Overview](./promotion-overview.md) → [Main Flow Diagram](./promotion-main-flow.md)

**👨‍💻 Developers (New to Codebase):**
- [High-Level Overview](./promotion-overview.md) → [Component Interactions](./promotion-components.md) → [Detailed Function Logic](./promotion-detailed-logic.md)

**🔧 Developers (Implementation/Debugging):**
- [Detailed Function Logic](./promotion-detailed-logic.md) → [Sequence Diagram](./promotion-sequence.md) → [Main Flow Diagram](./promotion-main-flow.md)

**🧪 QA Engineers:**
- [High-Level Overview](./promotion-overview.md) → [Main Flow Diagram](./promotion-main-flow.md) → [Detailed Function Logic](./promotion-detailed-logic.md)

## 🔍 Important Notes

### Validation Rules
- Promotions must be claimed (`isClaimed: true`) to be active
- Free spins have expiry times that must be checked
- Bonus amounts are tracked and decremented during gameplay

### Error Handling
- Invalid free spin usage results in failed bet publishing
- API failures for promotion updates are logged but don't block settlement
- Promotion completion is automatic when conditions are met

### Data Synchronization
- Free spin counts are updated in both database and memory cache
- Promotion state is shared across components via player object
- External promotion system integration via API calls

## 🛠️ Development Guidelines

### Adding New Promotion Features
1. Update relevant data structures
2. Modify validation logic in `place-bet-consumer.js`
3. Update processing logic in `slot-process-bet-queue.js`
4. Handle settlement in `settle-game-round-consumer.js`
5. Update documentation diagrams

### Testing Considerations
- Test promotion expiry scenarios
- Validate free spin count accuracy
- Test promotion completion conditions  
- Verify API integration error handling 