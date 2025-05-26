import { jetstreamManager, RetentionPolicy } from "@nats-io/jetstream";
import { connect } from "@nats-io/transport-node";

export default class NatsClient {
    constructor(appConfigs, definition) {
        this.natsOptions = appConfigs.natsOptions;
        this.definition = definition;
        this.connect();
    }

    async connect() {
        this.nats = await connect(this.natsOptions.connectionOptions);
        this.jetstreamManager = await jetstreamManager(this.nats);

        await this.jetstreamManager.streams.add({
            subjects: ["jackpot-pools.>"],
            max_msgs_per_subject: 1,
            retention: RetentionPolicy.Workqueue,
            ...this.natsOptions.streams.jackpotPools,
        });

        await this.jetstreamManager.streams.add({
            subjects: ["jackpot-winners.>"],
            max_age: 0,
            retention: RetentionPolicy.Workqueue,
            ...this.natsOptions.streams.jackpotWinners,
        });
    }

    async publish(subject, payload, streamName) {
        await this.jetstreamManager.jetstream().publish(subject, JSON.stringify(payload), {
            expect: {
                streamName,
            },
        });
    }

    async publishJackpotRunningPools(jackpotRunningPools) {
        await this.publish(
            `jackpot-pools.${this.definition.id}-${this.definition.configName}`,
            jackpotRunningPools,
            this.natsOptions.streams.jackpotPools.name
        );
    }

    async publishJackpotWinner(jackpotWinner) {
        await this.publish(
            `jackpot-winners.${this.definition.id}-${this.definition.configName}`,
            jackpotWinner,
            this.natsOptions.streams.jackpotWinners.name
        );
    }
}
