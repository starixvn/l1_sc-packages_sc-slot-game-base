### {gamename}\_freespins

```json
{
    id: { type: Number, required: true },
    uid: { type: String, required: true },
    name: { type: String, required: true },
    roundId: { type: Number, required: true },
    bet: { type: Number, required: true },
    paylines: { type: [Number], required: true },
    total: { type: Number, required: true },
    available: { type: Number, default: 0 },
    time: { type: Date, required: true },
    expiryTime: { type: Date, required: true },
    playerId: { type: String, required: true },
    promotionId: {type: String }, //new field, it has value when player get free spins from promotion bets
}
```

### {gamename}\_rounds

freeSpin trigger by promotion bets: freeSpin=true, promotionId has value

```json
{
    id: { type: Number, required: true },
    name: { type: String, required: true },
    siteId: { type: String },
    uid: { type: String },

    bet: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
    baseTotalAmount: { type: Number, default: 0 },
    paylines: { type: [Number] },
    freeSpin: { type: Boolean, default: false },

    result: { type: [Number] },
    settlementResult: { type: settlementResultSchema },
    bonusChests: { type: [bonusChestSchema] },
    jackpotContribution: { type: jackpotContributionSchema },

    odds: { type: Object },
    betWin: { type: Number, default: 0 },
    baseBetWin: { type: Number, default: 0 },
    jackpotWin: { type: Number },
    paid: { type: Boolean, default: false },
    time: { type: Date },
    endTime: { type: Date },

    currency: { type: String, required: true },
    rate: { type: Number, required: true },
    exchangeRateId: { type: Number, required: true },

    operatorId: { type: String, required: true },
    playerId: { type: String, required: true },
    promotionId: { type: String }
}
```
