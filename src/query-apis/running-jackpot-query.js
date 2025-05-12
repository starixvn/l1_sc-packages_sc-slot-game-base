export default class RunningJackpotQuery {
    constructor(gameId, jackpotRepository) {
        this.gameId = gameId;
        this.jackpotRepository = jackpotRepository;
    }

    async queryRunningJackpot(operatorId, siteName) {
        const runningPoolsFilter = {
            winnerName: { $exists: false },
            gameId: this.gameId,
            operatorId: operatorId,
            siteNames: siteName,
        };

        const projection = {
            _id: false,
            gameId: true,
            pool: "$prize",
            p: "$pool",
            amount: true,
        };

        const jackpot = await this.jackpotRepository
            .find(runningPoolsFilter, projection, { sort: { gameId: 1, pool: 1 } })
            .lean()
            .exec();

        return jackpot;
    }
}
