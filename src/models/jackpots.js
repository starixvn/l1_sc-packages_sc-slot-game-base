import mongoose from "mongoose";

const jackpotSchema = new mongoose.Schema({
    pool: { type: Number }, // pool associated with each bet amount, such as 100, 100, etc.
    prize: { type: String, required: true }, // jackpot prizes such as minor, major, grand....
    initAmount: { type: Number, required: true },
    amount: { type: Number, default: 0 },
    winningRatio: { type: Number },

    winnerName: { type: String },
    winnerId: { type: Number },

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
