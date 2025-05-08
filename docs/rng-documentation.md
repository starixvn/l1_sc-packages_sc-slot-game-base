# Random Number Generator (RNG) Implementation Documentation

## Overview

This document describes the Random Number Generator (RNG) implementation used in the slot game board generation process. The implementation uses the `sc-core-rng` package (version 1.0.3-beta.5) which provides cryptographically secure random number generation functions.

## RNG Functions Used

### 1. `securePickSet(array, count)`

- **Purpose**: Selects a random subset of elements from an array
- **Usage Location**: `BoardGenerator.generateByStrategy()`
- **Parameters**:
  - `array`: Array of symbols to select from
  - `count`: Number of elements to select
- **Return Value**: Array of randomly selected elements
- **Security**: Uses cryptographically secure random number generation

### 2. `secureShuffle(array)`

- **Purpose**: Randomly shuffles elements in an array
- **Usage Location**: `BoardGenerator.shuffle()`
- **Parameters**:
  - `array`: Array to be shuffled
- **Return Value**: Shuffled array
- **Security**: Uses cryptographically secure random number generation
- **Number of Shuffles**: Default is 3 times (configurable via `numberOfShuffles` in board definition)

## Board Generation Process

### 1. Initial Board Generation

1. The board generation process starts with a filling strategy based on difficulty level (easy, medium, hard)
2. Each row's symbols are determined by their weights in the filling strategy
3. `securePickSet` is used to randomly select symbols for each column based on the weighted distribution

### 2. Board Shuffling

1. After initial board generation, the entire board is shuffled using `secureShuffle`
2. The shuffling process is repeated 3 times by default to ensure complete randomization
3. The number of shuffles is configurable through the board definition

## Security Measures

1. **Cryptographic Security**: All RNG operations use cryptographically secure random number generation
2. **Multiple Shuffles**: Multiple rounds of shuffling ensure complete randomization
3. **Weighted Distribution**: Symbol selection maintains the intended probability distribution while ensuring randomness

## GLI Compliance Considerations

1. **RNG Source**: The implementation uses the `sc-core-rng` package which provides cryptographically secure random number generation
2. **Deterministic Output**: The RNG implementation ensures that:
   - Each spin produces a unique, random result
   - Results cannot be predicted or manipulated
   - The probability distribution matches the intended game design
3. **Verification**: The implementation allows for:
   - Verification of RNG results through logging
   - Testing of probability distributions
   - Validation of game outcomes

## Testing and Validation

The RNG implementation includes comprehensive test coverage:

- Unit tests verify the randomness of generated boards
- Integration tests ensure proper symbol distribution
- Probability distribution tests validate game fairness

## Configuration

The RNG behavior can be configured through:

- Board definition settings
- Difficulty levels
- Number of shuffles
- Symbol weights and distributions

## Dependencies

- `sc-core-rng`: Version 1.0.3-beta.5
- Used for all cryptographically secure random number generation operations
