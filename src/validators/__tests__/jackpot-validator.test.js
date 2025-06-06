import JackpotValidator from "../jackpot-validator";

describe("JackpotValidator", () => {
    let gameData;
    let jackpotConfigsConsumer;
    let validator;

    beforeEach(() => {
        gameData = {
            currencies: [],
        };
        jackpotConfigsConsumer = {
            getJackpotConfig: jest.fn(),
        };
        validator = new JackpotValidator(gameData, jackpotConfigsConsumer);
    });

    describe("canAccessJackpot", () => {
        it.each([
            [
                "when jackpot config exists and jackpot not disabled",
                { session: { operatorId: "op1", siteName: "site1", disableJackpotGames: false } },
                true,
                {},
            ],
            [
                "when jackpot config exists but jackpot disabled",
                { session: { operatorId: "op1", siteName: "site1", disableJackpotGames: true } },
                false,
                {},
            ],
            ["when jackpot config does not exist", { session: { operatorId: "op1", siteName: "site1", disableJackpotGames: false } }, null, null],
        ])("%s", (_, player, expected, config) => {
            // Arrange
            jackpotConfigsConsumer.getJackpotConfig.mockReturnValue(config);

            // Act
            const result = validator.canAccessJackpot(player);

            // Assert
            expect(result).toBe(expected);
            expect(jackpotConfigsConsumer.getJackpotConfig).toHaveBeenCalledWith(player.session.operatorId, player.session.siteName);
        });
    });

    describe("canContributeJackpotPools", () => {
        const player = {
            session: {
                operatorId: "op1",
                siteName: "site1",
                disableJackpotGames: false,
                currencyName: "USD",
            },
        };

        it.each([
            ["returns false when freeSpin is true", true, false, {}, []],
            ["returns true for normal currency", false, true, {}, []],
            ["returns false for test currency when excluded", false, false, { excludeTestCurrency: true }, [{ name: "USD", isTest: true }]],
            ["returns true for test currency when not excluded", false, true, { excludeTestCurrency: false }, [{ name: "USD", isTest: true }]],
            ["returns false when jackpot config does not exist", false, false, null, []],
        ])("%s", (_, freeSpin, expected, config, currencies) => {
            // Arrange
            gameData.currencies = currencies;
            jackpotConfigsConsumer.getJackpotConfig.mockReturnValue(config);

            // Act
            const result = validator.canContributeJackpotPools(player, freeSpin);

            // Assert
            expect(result).toBe(expected);
            expect(jackpotConfigsConsumer.getJackpotConfig).toHaveBeenCalledWith(player.session.operatorId, player.session.siteName);
        });
    });

    describe("canHitJackpot", () => {
        const player = {
            session: {
                operatorId: "op1",
                siteName: "site1",
                disableJackpotGames: false,
                currencyName: "USD",
            },
        };

        it.each([
            ["returns true for normal currency", true, {}, []],
            ["returns false for test currency when excluded", false, { excludeTestCurrency: true }, [{ name: "USD", isTest: true }]],
            ["returns true for test currency when not excluded", true, { excludeTestCurrency: false }, [{ name: "USD", isTest: true }]],
            ["returns false when jackpot config does not exist", false, null, []],
        ])("%s", (_, expected, config, currencies) => {
            // Arrange
            gameData.currencies = currencies;
            jackpotConfigsConsumer.getJackpotConfig.mockReturnValue(config);

            // Act
            const result = validator.canHitJackpot(player);

            // Assert
            expect(result).toBe(expected);
            expect(jackpotConfigsConsumer.getJackpotConfig).toHaveBeenCalledWith(player.session.operatorId, player.session.siteName);
        });
    });
});
