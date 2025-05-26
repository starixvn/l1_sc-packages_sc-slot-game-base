import { jetstreamManager } from "@nats-io/jetstream";
import { connect } from "@nats-io/transport-node";

export default class NatsClient {
    constructor(appConfigs) {
        this.natsOptions = appConfigs.natsOptions;
        this.connect();
    }

    async connect() {
        this.nats = await connect(this.natsOptions.connectionOptions);
        this.jetstreamManager = await jetstreamManager(this.nats);

        await this.jetstreamManager.streams.add(this.natsOptions.streams.jackpotRunningPools);
        await this.jetstreamManager.streams.add(this.natsOptions.streams.jackpotWinners);
    }

    async publish(subject, payload, streamName) {
        await this.jetstreamManager.jetstream().publish(subject, JSON.stringify(payload), {
            expect: {
                streamName,
            },
        });
    }

    async publishJackpotRunningPools(jackpotRunningPools) {
        await this.publish("jackpot.runningpools", jackpotRunningPools, this.natsOptions.streams.jackpotRunningPools.name);
    }

    async publishJackpotWinner(jackpotWinner) {
        await this.publish("jackpot.winner", jackpotWinner, this.natsOptions.streams.jackpotWinners.name);
    }
}
