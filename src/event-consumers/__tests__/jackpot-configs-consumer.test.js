import { JackpotConfigsConsumer } from "..";
import SlotGameData from "../../slot-game-data";

describe("JackpotConfigsConsumer", () => {
    let consumer;
    let gameData;

    beforeEach(() => {
        // Arrange - Setup common test dependencies
        gameData = new SlotGameData();
        // Initialize jackpotConfigs as empty array by default
        gameData.jackpotConfigs = [];

        // Add test configurations
        gameData.jackpotConfigs = [
            {
                _id: "config1",
                operatorId: "op1",
                siteNames: ["site1", "site2"],
                winningRatio: 0.98,
                pools: {
                    minor: {
                        init: 5000,
                        playerSettings: { contrib: 0.1, alloc: 90 },
                    },
                    major: {
                        init: 25000,
                        playerSettings: { contrib: 0.15, alloc: 9 },
                    },
                },
            },
            {
                _id: "config2",
                operatorId: "op2",
                siteNames: [], // Global config for all sites
                winningRatio: 0.97,
                pools: {
                    minor: {
                        init: 1000,
                        playerSettings: { contrib: 0.05, alloc: 95 },
                    },
                },
            },
            {
                _id: "config3",
                operatorId: "op3",
                siteNames: ["site3"],
                winningRatio: 0.96,
                pools: {
                    grand: {
                        init: 50000,
                        playerSettings: { contrib: 0.25, alloc: 100 },
                    },
                },
            },
        ];

        consumer = new JackpotConfigsConsumer(gameData);
    });

    describe("getJackpotConfig", () => {
        describe("with specific site configuration", () => {
            it("should return defined config when operator and site match exactly", () => {
                // Arrange
                const operatorId = "op1";
                const siteName = "site1";

                // Act
                const config = consumer.getJackpotConfig(operatorId, siteName);

                // Assert
                expect(config).toBeDefined();
            });

            it("should return config with correct ID when operator and site match exactly", () => {
                // Arrange
                const operatorId = "op1";
                const siteName = "site1";

                // Act
                const config = consumer.getJackpotConfig(operatorId, siteName);

                // Assert
                expect(config._id).toBe("config1");
            });

            it("should return config with matching operator ID", () => {
                // Arrange
                const operatorId = "op1";
                const siteName = "site1";

                // Act
                const config = consumer.getJackpotConfig(operatorId, siteName);

                // Assert
                expect(config.operatorId).toBe(operatorId);
            });

            it("should return config that includes the specified site name", () => {
                // Arrange
                const operatorId = "op1";
                const siteName = "site1";

                // Act
                const config = consumer.getJackpotConfig(operatorId, siteName);

                // Assert
                expect(config.siteNames).toContain(siteName);
            });

            it("should return undefined when operator matches but site doesn't", () => {
                // Arrange
                const operatorId = "op1";
                const siteName = "site3";

                // Act
                const config = consumer.getJackpotConfig(operatorId, siteName);

                // Assert
                expect(config).toBeUndefined();
            });

            it("should return undefined when neither operator nor site match", () => {
                // Arrange
                const operatorId = "op4";
                const siteName = "site4";

                // Act
                const config = consumer.getJackpotConfig(operatorId, siteName);

                // Assert
                expect(config).toBeUndefined();
            });
        });

        describe("with global site configuration", () => {
            it("should return defined config when operator matches and siteNames is empty", () => {
                // Arrange
                const operatorId = "op2";
                const siteName = "any-site";

                // Act
                const config = consumer.getJackpotConfig(operatorId, siteName);

                // Assert
                expect(config).toBeDefined();
            });

            it("should return config with correct ID for global config", () => {
                // Arrange
                const operatorId = "op2";
                const siteName = "any-site";

                // Act
                const config = consumer.getJackpotConfig(operatorId, siteName);

                // Assert
                expect(config._id).toBe("config2");
            });

            it("should return config with matching operator ID for global config", () => {
                // Arrange
                const operatorId = "op2";
                const siteName = "any-site";

                // Act
                const config = consumer.getJackpotConfig(operatorId, siteName);

                // Assert
                expect(config.operatorId).toBe(operatorId);
            });

            it("should return config with empty siteNames array for global config", () => {
                // Arrange
                const operatorId = "op2";
                const siteName = "any-site";

                // Act
                const config = consumer.getJackpotConfig(operatorId, siteName);

                // Assert
                expect(config.siteNames).toHaveLength(0);
            });

            it("should return undefined when operator doesn't match even with empty siteNames", () => {
                // Arrange
                const operatorId = "op4";
                const siteName = "any-site";

                // Act
                const config = consumer.getJackpotConfig(operatorId, siteName);

                // Assert
                expect(config).toBeUndefined();
            });
        });
    });

    describe("getJackpotConfigById", () => {
        it("should return defined config when ID matches exactly", () => {
            // Arrange
            const configId = "config1";

            // Act
            const config = consumer.getJackpotConfigById(configId);

            // Assert
            expect(config).toBeDefined();
        });

        it("should return config with matching ID", () => {
            // Arrange
            const configId = "config1";

            // Act
            const config = consumer.getJackpotConfigById(configId);

            // Assert
            expect(config._id).toBe(configId);
        });

        it("should return config with correct operator ID", () => {
            // Arrange
            const configId = "config1";

            // Act
            const config = consumer.getJackpotConfigById(configId);

            // Assert
            expect(config.operatorId).toBe("op1");
        });

        it("should return undefined when ID doesn't match", () => {
            // Arrange
            const configId = "non-existent";

            // Act
            const config = consumer.getJackpotConfigById(configId);

            // Assert
            expect(config).toBeUndefined();
        });

        describe("with multiple config IDs", () => {
            const configIds = ["config1", "config2", "config3"];

            configIds.forEach((configId) => {
                it(`should return defined config for ID ${configId}`, () => {
                    // Act
                    const config = consumer.getJackpotConfigById(configId);

                    // Assert
                    expect(config).toBeDefined();
                });

                it(`should return config with matching ID for ${configId}`, () => {
                    // Act
                    const config = consumer.getJackpotConfigById(configId);

                    // Assert
                    expect(config._id).toBe(configId);
                });
            });
        });
    });

    describe("edge cases", () => {
        it("should return undefined for getJackpotConfig when jackpotConfigs is undefined", () => {
            // Arrange - Create a new instance with undefined jackpotConfigs
            const emptyGameData = new SlotGameData();
            const emptyConsumer = new JackpotConfigsConsumer(emptyGameData);

            // Act
            const configBySite = emptyConsumer.getJackpotConfig("op1", "site1");

            // Assert
            expect(configBySite).toBeUndefined();
        });

        it("should return undefined for getJackpotConfigById when jackpotConfigs is undefined", () => {
            // Arrange - Create a new instance with undefined jackpotConfigs
            const emptyGameData = new SlotGameData();
            const emptyConsumer = new JackpotConfigsConsumer(emptyGameData);

            // Act
            const configById = emptyConsumer.getJackpotConfigById("config1");

            // Assert
            expect(configById).toBeUndefined();
        });

        it("should return undefined for getJackpotConfig with empty jackpotConfigs array", () => {
            // Arrange
            gameData.jackpotConfigs = [];

            // Act
            const configBySite = consumer.getJackpotConfig("op1", "site1");

            // Assert
            expect(configBySite).toBeUndefined();
        });

        it("should return undefined for getJackpotConfigById with empty jackpotConfigs array", () => {
            // Arrange
            gameData.jackpotConfigs = [];

            // Act
            const configById = consumer.getJackpotConfigById("config1");

            // Assert
            expect(configById).toBeUndefined();
        });

        it("should return undefined for getJackpotConfig with null operator ID", () => {
            // Act
            const configWithNullOp = consumer.getJackpotConfig(null, "site1");

            // Assert
            expect(configWithNullOp).toBeUndefined();
        });

        it("should return undefined for getJackpotConfig with null site name", () => {
            // Act
            const configWithNullSite = consumer.getJackpotConfig("op1", null);

            // Assert
            expect(configWithNullSite).toBeUndefined();
        });

        it("should return undefined for getJackpotConfigById with null ID", () => {
            // Act
            const configWithNullId = consumer.getJackpotConfigById(null);

            // Assert
            expect(configWithNullId).toBeUndefined();
        });
    });
});
