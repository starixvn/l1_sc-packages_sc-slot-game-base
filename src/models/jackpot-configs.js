import mongoose from "mongoose";

const botConfigSchema = new mongoose.Schema({
    enabled: { type: Boolean, required: true },
    botRatio: { type: Array, required: true },
});

const contribSettingSchema = new mongoose.Schema({
    contrib: { type: Number, required: true },
    alloc: { type: Number, required: true },
});

const poolConfigSchema = new mongoose.Schema({
    init: { type: Number, required: true },
    contribute: { type: Number, required: true },
    bot: { type: Number, required: true },
    w: { type: Number, required: true },
    playerSettings: { type: contribSettingSchema, required: true },
    botSettings: { type: contribSettingSchema, required: true },
});

const poolSchema = new mongoose.Schema({
    minor: { type: poolConfigSchema, required: true },
    major: { type: poolConfigSchema, required: true },
    grand: { type: poolConfigSchema, required: true },
});

const jackpotConfigSchema = new mongoose.Schema({
    gameId: { type: Number, required: true },
    siteName: { type: [String], required: true },
    operatorId: { type: String, required: true, default: "" },
    enabled: { type: Boolean, required: true },
    pools: { type: poolSchema, required: true },
    botConfig: { type: botConfigSchema, required: true },
});

const JackpotConfig = mongoose.model("JackpotConfig", jackpotConfigSchema);

export default JackpotConfig;
