import mongoose from "mongoose";

const jackpotSchema = new mongoose.Schema({
    gameId: { type: Number, required: true },
    gameName: { type: String, required: true },
    pool: { type: Number },
    prize: { type: String },
    initAmount: { type: Number, required: true },
    amount: { type: Number, default: 0 },
    winningRatio: { type: Number },

    winnerName: { type: String },
    winnerId: { type: String },

    byBots: { type: Number, default: 0 },
    byMembers: { type: Number, default: 0 },

    createdAt: { type: Number, required: true },
    hitAt: { type: Number },

    createdTime: { type: Date, required: true },
    hitTime: { type: Date },

    rate: { type: Number },
    exchangeRateId: { type: Number },
    currency: { type: String },

    operatorId: { type: String },
    siteNames: { type: [String] },
});

export default mongoose.model("Jackpot", jackpotSchema);
