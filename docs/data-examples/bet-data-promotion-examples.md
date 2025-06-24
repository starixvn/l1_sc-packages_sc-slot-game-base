# Bet Data Examples: With and Without Promotion

This document provides examples of how bet data is structured when processed with and without promotion features in the slot game.

## Overview

The slot promotion interceptor enhances two main data structures:

- **betInfo**: Enhanced during bet placement with promotion metadata
- **betRecord**: Enhanced during bet recording with promotion identifiers

## Bet Info Examples

### Without Promotion

```json
{
  "amount": 0.5,
  "freeBet": false,
  "freeSpin": false,
  "betChoice": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
  "totalAmount": 12.5,
  "contributionRate": 0.05,
  "contributionAmount": 0.625
}
```

### With Promotion

```json
{
  "amount": 0.5,
  "freeBet": false,
  "freeSpin": false,
  "betChoice": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
  "totalAmount": 12.5,
  "contributionRate": 0,
  "contributionAmount": 0,
  "promotionId": "promo_summer_2024"
}
```

## Bet Record Examples

### Without Promotion

```json
{
  "id": 12345,
  "uid": "player123",
  "name": "testplayer",
  "freeBet": false,
  "time": "2024-01-15T10:30:00.000Z",
  "paylines": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
  "freeSpin": false,
  "bet": 0.5,
  "totalAmount": 12.5,
  "baseTotalAmount": 12.5,
  "rate": 1.0,
  "exchangeRateId": "USD_2024",
  "siteId": "site001",
  "currency": "USD",
  "operatorId": "op123",
  "playerId": "pl456",
  "jackpotContribution": {
    "contributionRate": 0.05,
    "baseContributionAmount": 0.625
  }
}
```

### With Promotion

```json
{
  "id": 12345,
  "uid": "player123",
  "name": "testplayer",
  "freeBet": false,
  "time": "2024-01-15T10:30:00.000Z",
  "paylines": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
  "freeSpin": false,
  "bet": 0.5,
  "totalAmount": 12.5,
  "baseTotalAmount": 12.5,
  "rate": 1.0,
  "exchangeRateId": "USD_2024",
  "siteId": "site001",
  "currency": "USD",
  "operatorId": "op123",
  "playerId": "pl456",
  "promotionId": "promo_summer_2024",
  "jackpotContribution": {
    "contributionRate": 0.05,
    "baseContributionAmount": 0.625
  }
}
```

## Free Spins Examples

### Without Promotion

```json
{
  "id": 1,
  "uid": "player-uid-123",
  "name": "player1",
  "roundId": 1001,
  "bet": 10,
  "paylines": [0, 1, 2, 3, 4],
  "total": 5,
  "available": 2,
  "time": "2024-07-17T09:02:19.909Z",
  "expiryTime": "2024-07-18T09:02:19.909Z",
  "playerId": "player-uid-123",
  "freeSpin": true,
  "jackpotContribution": {
    "contributionRate": 0,
    "baseContributionAmount": 0
  }
}
```

### With Promotion

```json
{
  "id": 1,
  "uid": "player-uid-123",
  "name": "player1",
  "roundId": 1001,
  "bet": 10,
  "paylines": [0, 1, 2, 3, 4],
  "total": 5,
  "available": 2,
  "time": "2024-07-17T09:02:19.909Z",
  "expiryTime": "2024-07-18T09:02:19.909Z",
  "playerId": "player-uid-123",
  "freeSpin": true,
  "promotionId": "promo_summer_2024",
  "jackpotContribution": {
    "contributionRate": 0,
    "baseContributionAmount": 0
  }
}
```

## Hall of Fames Examples

### Without Promotion

```json
{
  "uid": "player-uid-123",
  "name": "player1",
  "roundId": 1001,
  "bet": 10,
  "totalAmount": 200,
  "baseTotalAmount": 2000,
  "winningAmount": 700,
  "baseWinningAmount": 7000,
  "numberOfPaylines": 5,
  "freeSpin": false,
  "time": "2024-07-17T09:02:19.909Z",
  "currency": "USD",
  "rate": 1.5,
  "exchangeRateId": 1,
  "operatorId": "operator-1",
  "playerId": "player-uid-123"
}
```

### With Promotion

```json
{
  "uid": "player-uid-123",
  "name": "player1",
  "roundId": 1001,
  "bet": 10,
  "totalAmount": 200,
  "baseTotalAmount": 2000,
  "winningAmount": 700,
  "baseWinningAmount": 7000,
  "numberOfPaylines": 5,
  "freeSpin": false,
  "time": "2024-07-17T09:02:19.909Z",
  "currency": "USD",
  "rate": 1.5,
  "exchangeRateId": 1,
  "operatorId": "operator-1",
  "playerId": "player-uid-123",
  "promotionId": "promo_summer_2024"
}
```

## Rounds Examples

### Without Promotion

```json
{
  "_id": { "$oid": "6697889b1139b0670d481180" },
  "bet": 1,
  "totalAmount": 25,
  "baseTotalAmount": 25000,
  "paylines": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
  "freeSpin": false,
  "result": [10, 5, 4, 10, 8, 7, 10, 5, 8, 10, 0, 8, 10, 5, 0],
  "betWin": 327,
  "baseBetWin": 327000,
  "paid": true,
  "id": 372531,
  "name": "lele60010",
  "time": { "$date": "2024-07-17T09:02:19.909Z" },
  "rate": 1000,
  "exchangeRateId": 4308,
  "jackpotContribution": { "contributionRate": 0.025, "baseContributionAmount": 625 },
  "poolAllocation": {
    "grand": { "rate": 0.005, "baseAmount": 125 },
    "major": { "rate": 0.005, "baseAmount": 125 },
    "minor": { "rate": 0.015, "baseAmount": 375 }
  },
  "bonusChests": [
    { "picked": true, "amount": 15 },
    { "picked": true, "amount": 19 },
    { "picked": true, "amount": 17 }
  ],
  "__v": 2,
  "settlementResult": {
    "freeSpins": { "count": 1, "odds": 0 },
    "bonus": { "count": 3, "odds": 3 },
    "jackpot": { "winningAmount": 4905.5831, "winningLine": 1 },
    "winningPaylines": [
      { "payline": 0, "symbol": "5", "count": 3, "odds": 16 },
      { "payline": 4, "symbol": "10", "count": 2, "odds": 4 },
      { "payline": 5, "symbol": "10", "count": 3, "odds": 25 },
      { "payline": 7, "symbol": "10", "count": 2, "odds": 4 },
      { "payline": 8, "symbol": "10", "count": 2, "odds": 4 },
      { "payline": 9, "symbol": "5", "count": 3, "odds": 16 },
      { "payline": 10, "symbol": "5", "count": 3, "odds": 16 },
      { "payline": 11, "symbol": "10", "count": 2, "odds": 4 },
      { "payline": 13, "symbol": "10", "count": 3, "odds": 25 },
      { "payline": 17, "symbol": "10", "count": 4, "odds": 100 },
      { "payline": 19, "symbol": "10", "count": 2, "odds": 4 },
      { "payline": 20, "symbol": "10", "count": 3, "odds": 25 },
      { "payline": 21, "symbol": "10", "count": 2, "odds": 4 },
      { "payline": 23, "symbol": "10", "count": 3, "odds": 25 },
      { "payline": 24, "symbol": "10", "count": 2, "odds": 4 }
    ]
  },
  "endTime": { "$date": "2024-07-17T09:02:52.024Z" },
  "__archive": { "summarized": true }
}
```

### With Promotion

```json
{
  "_id": { "$oid": "6697889b1139b0670d481180" },
  "bet": 1,
  "totalAmount": 25,
  "baseTotalAmount": 25000,
  "paylines": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
  "freeSpin": false,
  "result": [10, 5, 4, 10, 8, 7, 10, 5, 8, 10, 0, 8, 10, 5, 0],
  "betWin": 327,
  "baseBetWin": 327000,
  "paid": true,
  "id": 372531,
  "name": "lele60010",
  "time": { "$date": "2024-07-17T09:02:19.909Z" },
  "rate": 1000,
  "exchangeRateId": 4308,
  "jackpotContribution": { "contributionRate": 0.025, "baseContributionAmount": 625 },
  "poolAllocation": {
    "grand": { "rate": 0.005, "baseAmount": 125 },
    "major": { "rate": 0.005, "baseAmount": 125 },
    "minor": { "rate": 0.015, "baseAmount": 375 }
  },
  "bonusChests": [
    { "picked": true, "amount": 15 },
    { "picked": true, "amount": 19 },
    { "picked": true, "amount": 17 }
  ],
  "__v": 2,
  "settlementResult": {
    "freeSpins": { "count": 1, "odds": 0 },
    "bonus": { "count": 3, "odds": 3 },
    "jackpot": { "winningAmount": 4905.5831, "winningLine": 1 },
    "winningPaylines": [
      { "payline": 0, "symbol": "5", "count": 3, "odds": 16 },
      { "payline": 4, "symbol": "10", "count": 2, "odds": 4 },
      { "payline": 5, "symbol": "10", "count": 3, "odds": 25 },
      { "payline": 7, "symbol": "10", "count": 2, "odds": 4 },
      { "payline": 8, "symbol": "10", "count": 2, "odds": 4 },
      { "payline": 9, "symbol": "5", "count": 3, "odds": 16 },
      { "payline": 10, "symbol": "5", "count": 3, "odds": 16 },
      { "payline": 11, "symbol": "10", "count": 2, "odds": 4 },
      { "payline": 13, "symbol": "10", "count": 3, "odds": 25 },
      { "payline": 17, "symbol": "10", "count": 4, "odds": 100 },
      { "payline": 19, "symbol": "10", "count": 2, "odds": 4 },
      { "payline": 20, "symbol": "10", "count": 3, "odds": 25 },
      { "payline": 21, "symbol": "10", "count": 2, "odds": 4 },
      { "payline": 23, "symbol": "10", "count": 3, "odds": 25 },
      { "payline": 24, "symbol": "10", "count": 2, "odds": 4 }
    ]
  },
  "endTime": { "$date": "2024-07-17T09:02:52.024Z" },
  "__archive": { "summarized": true },
  "promotionId": "promo_summer_2024"
}
```

### Free Spin Triggered by Promotion (Rounds Example)

This example shows how to recognize if a free spin in a round was triggered by a bet with a promotion. The field `freeSpinTriggeredByPromotion` is set to `true` and the `promotionId` is included in the `settlementResult.freeSpins` object.

#### Free Spin Triggered by Promotion

```json
{
  "_id": { "$oid": "6697889b1139b0670d481180" },
  "bet": 1,
  "totalAmount": 25,
  "baseTotalAmount": 25000,
  "paylines": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
  "freeSpin": true,
  "result": [10, 5, 4, 10, 8, 7, 10, 5, 8, 10, 0, 8, 10, 5, 0],
  "betWin": 327,
  "baseBetWin": 327000,
  "paid": true,
  "id": 372531,
  "name": "lele60010",
  "time": { "$date": "2024-07-17T09:02:19.909Z" },
  "rate": 1000,
  "exchangeRateId": 4308,
  "jackpotContribution": { "contributionRate": 0, "baseContributionAmount": 0 },
  "poolAllocation": {
    "grand": { "rate": 0.005, "baseAmount": 125 },
    "major": { "rate": 0.005, "baseAmount": 125 },
    "minor": { "rate": 0.015, "baseAmount": 375 }
  },
  "bonusChests": [
    { "picked": true, "amount": 15 },
    { "picked": true, "amount": 19 },
    { "picked": true, "amount": 17 }
  ],
  "__v": 2,
  "settlementResult": {
    "freeSpins": { "count": 1, "odds": 0, "promotionId": "promo_summer_2024" },
    "bonus": { "count": 3, "odds": 3 },
    "jackpot": { "winningAmount": 4905.5831, "winningLine": 1 },
    "winningPaylines": [
      { "payline": 0, "symbol": "5", "count": 3, "odds": 16 },
      { "payline": 4, "symbol": "10", "count": 2, "odds": 4 },
      { "payline": 5, "symbol": "10", "count": 3, "odds": 25 },
      { "payline": 7, "symbol": "10", "count": 2, "odds": 4 },
      { "payline": 8, "symbol": "10", "count": 2, "odds": 4 },
      { "payline": 9, "symbol": "5", "count": 3, "odds": 16 },
      { "payline": 10, "symbol": "5", "count": 3, "odds": 16 },
      { "payline": 11, "symbol": "10", "count": 2, "odds": 4 },
      { "payline": 13, "symbol": "10", "count": 3, "odds": 25 },
      { "payline": 17, "symbol": "10", "count": 4, "odds": 100 },
      { "payline": 19, "symbol": "10", "count": 2, "odds": 4 },
      { "payline": 20, "symbol": "10", "count": 3, "odds": 25 },
      { "payline": 21, "symbol": "10", "count": 2, "odds": 4 },
      { "payline": 23, "symbol": "10", "count": 3, "odds": 25 },
      { "payline": 24, "symbol": "10", "count": 2, "odds": 4 }
    ]
  },
  "endTime": { "$date": "2024-07-17T09:02:52.024Z" },
  "__archive": { "summarized": true },
  "freeSpinTriggeredByPromotion": true
}
```

#### Free Spin Not Triggered by Promotion

```json
{
  "_id": { "$oid": "6697889b1139b0670d481180" },
  "bet": 1,
  "totalAmount": 25,
  "baseTotalAmount": 25000,
  "paylines": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
  "freeSpin": true,
  "result": [10, 5, 4, 10, 8, 7, 10, 5, 8, 10, 0, 8, 10, 5, 0],
  "betWin": 327,
  "baseBetWin": 327000,
  "paid": true,
  "id": 372531,
  "name": "lele60010",
  "time": { "$date": "2024-07-17T09:02:19.909Z" },
  "rate": 1000,
  "exchangeRateId": 4308,
  "jackpotContribution": { "contributionRate": 0, "baseContributionAmount": 0 },
  "poolAllocation": {
    "grand": { "rate": 0.005, "baseAmount": 125 },
    "major": { "rate": 0.005, "baseAmount": 125 },
    "minor": { "rate": 0.015, "baseAmount": 375 }
  },
  "bonusChests": [
    { "picked": true, "amount": 15 },
    { "picked": true, "amount": 19 },
    { "picked": true, "amount": 17 }
  ],
  "__v": 2,
  "settlementResult": {
    "freeSpins": { "count": 1, "odds": 0 },
    "bonus": { "count": 3, "odds": 3 },
    "jackpot": { "winningAmount": 4905.5831, "winningLine": 1 },
    "winningPaylines": [
      { "payline": 0, "symbol": "5", "count": 3, "odds": 16 },
      { "payline": 4, "symbol": "10", "count": 2, "odds": 4 },
      { "payline": 5, "symbol": "10", "count": 3, "odds": 25 },
      { "payline": 7, "symbol": "10", "count": 2, "odds": 4 },
      { "payline": 8, "symbol": "10", "count": 2, "odds": 4 },
      { "payline": 9, "symbol": "5", "count": 3, "odds": 16 },
      { "payline": 10, "symbol": "5", "count": 3, "odds": 16 },
      { "payline": 11, "symbol": "10", "count": 2, "odds": 4 },
      { "payline": 13, "symbol": "10", "count": 3, "odds": 25 },
      { "payline": 17, "symbol": "10", "count": 4, "odds": 100 },
      { "payline": 19, "symbol": "10", "count": 2, "odds": 4 },
      { "payline": 20, "symbol": "10", "count": 3, "odds": 25 },
      { "payline": 21, "symbol": "10", "count": 2, "odds": 4 },
      { "payline": 23, "symbol": "10", "count": 3, "odds": 25 },
      { "payline": 24, "symbol": "10", "count": 2, "odds": 4 }
    ]
  },
  "endTime": { "$date": "2024-07-17T09:02:52.024Z" },
  "__archive": { "summarized": true },
  "freeSpinTriggeredByPromotion": false
}
```

## Key Differences

### BetInfo Enhancement

- **Without Promotion**: Standard bet information with normal contribution rates
- **With Promotion**:
  - Sets `contributionRate` and `contributionAmount` to 0 (promotional bets don't contribute to jackpot)
  - Adds `promotionId` field directly to betInfo

### BetRecord Enhancement

- **Without Promotion**: Standard bet record fields
- **With Promotion**: Adds `promotionId` field directly to the record (required field, no null check)

## Notes

1. **PromotionId**: This field is required when promotion is active (no null safety checks)
2. **Paylines**: Not duplicated in betRecord as they're already saved in the main bet queue
3. **Direct Fields**: Promotion data is added directly to objects rather than wrapped in sub-objects for better query performance
4. **Backward Compatibility**: All promotion fields are additive and don't modify existing structure
5. **No BetLog**: The slot game only uses betInfo and betRecord - there is no separate betLog entity

## Best Practice and Conclusion: Distinguishing Free Spin Sources

When using the `freeSpin` field to indicate a free spin bet, it is important to distinguish whether the free spin was triggered by a promotion or by regular game mechanics. The recommended approach is as follows:

### Best Practice

- **Always** set `freeSpin: true` for any free spin bet, regardless of its source.
- **Always** add a `promotionId` field if the free spin was triggered by a promotion.
- **Do not** set `promotionId` for regular (non-promotion) free spins.
- **Document** this convention for all developers and data consumers.
- **(Optional, for future-proofing):** If you expect more sources, consider adding a `freeSpinSource` field (e.g., `"promotion"`, `"scatter"`, etc.).

### Example Table

| freeSpin | promotionId       | Meaning                       |
| -------- | ----------------- | ----------------------------- |
| true     | (not present)     | Regular free spin             |
| true     | promo_summer_2024 | Promotion-triggered free spin |
| false    | (any)             | Not a free spin               |

### Conclusion

There is no technical confusion as long as you consistently use `promotionId` to distinguish the source of a free spin and document this clearly. If you expect more complex scenarios in the future, consider a more explicit field like `freeSpinSource` for extensibility.

## Note on Jackpot Contribution for Free Spins

For any bet where `freeSpin: true` (whether triggered by a promotion or not), the jackpot contribution fields should be set to 0:

- `jackpotContribution.contributionRate: 0`
- `jackpotContribution.baseContributionAmount: 0`

This applies to both promotion and non-promotion free spins.
