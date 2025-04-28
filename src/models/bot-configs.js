import mongoose from "mongoose";

const modelName = "bot_configs";

const botConfigSchema = new mongoose.Schema({
    gameId: { type: Number, required: true },
    siteName: { type: [String], required: true },
    operatorId: { type: String, required: true, default: "" },
    enabled: { type: Boolean, required: true },
    bot_maxBet: { type: Number, required: true },
    bot_minBet: { type: Number, required: true },
    hour_maxBot: { type: [Number], required: true, default: [] },
});

export default mongoose.model(modelName, botConfigSchema);
