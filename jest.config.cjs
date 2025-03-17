module.exports = async () => {
    return {
        rootDir: "./",
        verbose: true,
        transform: {
            "^.+\\.js?$": "babel-jest",
        },
        transformIgnorePatterns: ["node_modules/(?!(sc-base-database|sc-common|sc-game-base|sc-base-apis|sc-api-client|axios|sc-core-rng)/)"],
        testEnvironment: "node",
        testResultsProcessor: "jest-sonar-reporter",
        setupFilesAfterEnv: ["jest-extended/all"],
        testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
    };
};
