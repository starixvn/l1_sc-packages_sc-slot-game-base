# Promotion System - High-Level Overview

This diagram provides a bird's-eye view of the promotion system, focusing on major phases and key decision points.

```mermaid
flowchart TD
    A[🎮 Player Joins Game] --> B[📊 Initialize Game Data]
    B --> C{🎁 Has Active Promotion?}
    
    C -->|Yes| D[🔄 Load Promotion Data<br/>- Free spins available<br/>- Bonus items<br/>- Expiry dates]
    C -->|No| E[🎲 Regular Game Mode]
    
    D --> F[🎯 Player Places Bet]
    E --> F
    
    F --> G{🎰 Bet Type?}
    G -->|Free Spin| H[✨ Use Free Spin<br/>- Validate source<br/>- Decrease count<br/>- No cost to player]
    G -->|Regular Bet| I[💰 Process Payment<br/>- Validate amount<br/>- Deduct from balance]
    
    H --> J[🎲 Generate Game Result]
    I --> J
    
    J --> K{🏆 Game Outcome?}
    K -->|Win Free Spins| L[🎁 Award Free Spins<br/>- Create new set<br/>- Link to promotion if active<br/>- Set expiry time]
    K -->|Win Bonus| M[💎 Award Bonus<br/>- Add to promotion bonus<br/>- Trigger bonus game]
    K -->|Win Jackpot| N[🎉 Process Jackpot<br/>- Calculate winnings<br/>- Update pools]
    K -->|Regular Win/Loss| O[💸 Calculate Payout<br/>- Apply multipliers<br/>- Update balance]
    
    L --> P[📝 Update Promotion Status]
    M --> P
    N --> P
    O --> P
    
    P --> Q{🎯 Promotion Complete?}
    Q -->|Yes| R[✅ Complete Promotion<br/>- Finalize bonuses<br/>- Update API<br/>- Clean up data]
    Q -->|No| S[🔄 Continue Game<br/>- Save state<br/>- Prepare next round]
    
    R --> T[🎊 End Game Session]
    S --> F
    
    style A fill:#e3f2fd
    style C fill:#fff3e0
    style G fill:#f3e5f5
    style K fill:#e8f5e8
    style Q fill:#fce4ec
    style R fill:#e0f2f1
    style T fill:#f9fbe7
```

## 🎯 System Phases

### 🔵 Initialization Phase (Blue)
- **Game Entry**: Player joins and system initializes
- **Promotion Check**: Determines if player has active promotions
- **Data Loading**: Loads promotion-specific data and settings

### 🟠 Bet Processing Phase (Orange)  
- **Bet Type Detection**: Distinguishes between free spins and regular bets
- **Payment Processing**: Handles different payment scenarios
- **Validation**: Ensures bet is valid and player eligible

### 🟣 Game Execution Phase (Purple)
- **Result Generation**: Creates random game outcomes
- **Outcome Classification**: Categorizes different types of wins
- **Reward Distribution**: Applies appropriate rewards based on outcome

### 🟢 Settlement Phase (Green)
- **Promotion Updates**: Updates promotion status and counters
- **Completion Check**: Determines if promotion should be completed
- **State Management**: Saves game state for next round

## 🎮 Key Decision Points

### 1. **Promotion Status Check**
- Determines game mode (promotion vs regular)
- Loads appropriate configuration and limits
- Sets validation rules for the session

### 2. **Bet Type Validation**
- **Free Spin**: Validates source, checks expiry, decreases count
- **Regular Bet**: Validates amount, checks balance, processes payment

### 3. **Outcome Processing**
- **Free Spins Win**: Creates new free spin sets with promotion context
- **Bonus Win**: Triggers bonus games and updates promotion bonuses
- **Jackpot Win**: Processes large payouts and pool updates
- **Regular Win**: Standard payout calculation and balance update

### 4. **Promotion Completion**
- Checks if all promotion requirements are met
- Automatically completes promotion when conditions satisfied
- Cleans up promotion data and notifies external systems

## 🔄 Flow Characteristics

- **Circular Nature**: Game continues until player exits or promotion completes
- **State Persistence**: All promotion data maintained across rounds
- **Error Recovery**: Failed operations don't break the game flow
- **External Integration**: Promotion system syncs with external APIs

## 📊 Data Flow Summary

```
Player → Game Init → Promotion Check → Bet → Game Result → Settlement → Repeat
```

This high-level view abstracts away implementation details to focus on business logic and user experience flow. 