import { stub, stubMongoose } from "jest-micro-auto-stub";
import mongoose from "mongoose";
import { EventInterceptors } from "sc-game-base/src/core";
import { RoundResultPublisher, UserBetResultPublisher } from "sc-game-base/src/core/event-publishers";
import GameManagementApiClientFactory from "sc-game-base/src/core/game-management-api";
import {
    BoardCheatingConsumer,
    BonusConsumer,
    FreeSpinsConsumer,
    GenerateResultConsumer,
    HallOfFameConsumer,
    JackpotConsumer,
    JackpotGameConsumer,
    SettleGameRoundConsumer,
} from "../";
import { BoardGenerator, BonusBoardGenerator, JackpotPrizeGenerator, PaylineCalculator } from "../../board";
import { JackpotPublisher } from "../../event-publishers";
import JackpotValidator from "../../validators/jackpot-validator";

const settleConsumer = stub(SettleGameRoundConsumer);
const jackpotPublisher = stub(JackpotPublisher);
const jackpotGameConsumer = stub(JackpotGameConsumer);
const roundResultPublisher = stub(RoundResultPublisher);
const userBetResultPublisher = stub(UserBetResultPublisher);
const boardCheatingConsumer = stub(BoardCheatingConsumer);
const freeSpinsConsumer = stub(FreeSpinsConsumer);
const hallOfFameConsumer = stub(HallOfFameConsumer);
const jackpotConsumer = stub(JackpotConsumer);
const boardGenerator = stub(BoardGenerator);
const bonusBoardGenerator = stub(BonusBoardGenerator);
const paylineCalculator = stub(PaylineCalculator);
const jackpotValidator = stub(JackpotValidator);
const generateResultConsumer = stub(GenerateResultConsumer);
const jackpotPrizeGenerator = stub(JackpotPrizeGenerator);
const bonusConsumer = stub(BonusConsumer);
const gameManagementApiClientFactory = stub(GameManagementApiClientFactory);
gameManagementApiClientFactory.instance.mockReturnValue({});
const promotionBetInterceptor = stub(EventInterceptors.PromotionBetInterceptor);

/** @type {mongoose.Model}*/
const roundsRepository = stubMongoose(mongoose.Model);

/** @type {mongoose.Model}*/
const betsRepository = stubMongoose(mongoose.Model);

export {
    betsRepository,
    boardCheatingConsumer,
    boardGenerator,
    bonusBoardGenerator,
    bonusConsumer,
    freeSpinsConsumer,
    gameManagementApiClientFactory,
    generateResultConsumer,
    hallOfFameConsumer,
    jackpotConsumer,
    jackpotGameConsumer,
    jackpotPrizeGenerator,
    jackpotPublisher,
    jackpotValidator,
    paylineCalculator,
    promotionBetInterceptor,
    roundResultPublisher,
    roundsRepository,
    settleConsumer,
    userBetResultPublisher,
};
