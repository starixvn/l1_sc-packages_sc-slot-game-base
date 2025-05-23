export default class JackpotQuery {
    constructor(jackpotsRepository, gameData) {
        this.jackpotsRepository = jackpotsRepository;
        this.gameData = gameData;
    }

    async queryRunningJackpot(operatorId, siteName) {
        const jackpotConfig = this.gameData.jackpotConfigs?.find(
            (jp) => jp.operatorId === operatorId && (jp.siteName.length === 0 || jp.siteNames.includes(siteName))
        );

        if (!jackpotConfig) {
            return [];
        }

        const runningPoolsFilter = {
            winnerName: { $exists: false },
            jackpotConfigId: jackpotConfig._id,
        };

        const projection = {
            _id: false,
            pool: "$prize",
            p: "$pool",
            amount: true,
            jackpotConfigId: false,
        };

        const jackpot = await this.jackpotsRepository
            .find(runningPoolsFilter, projection, { sort: { pool: 1 } })
            .lean()
            .exec();

        return jackpot;
    }

    async queryJackpotWinner(operatorId, siteName) {
        const jackpotConfig = this.gameData.jackpotConfigs?.find(
            (jp) => jp.operatorId === operatorId && (jp.siteName.length === 0 || jp.siteNames.includes(siteName))
        );

        if (!jackpotConfig) {
            return [];
        }

        const runningPoolsFilter = {
            winnerName: { $exists: true },
            jackpotConfigId: jackpotConfig._id,
        };

        const projection = {
            _id: false,
            pool: "$prize",
            winnerName: true,
            amount: true,
            winningRatio: true,
            exchangeRateId: true,
        };

        const jackpot = await this.jackpotsRepository
            .find(runningPoolsFilter, projection, { sort: { hitTime: -1 } })
            .lean()
            .exec();

        return jackpot;
    }
}
