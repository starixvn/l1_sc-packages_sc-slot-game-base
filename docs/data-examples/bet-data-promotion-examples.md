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
