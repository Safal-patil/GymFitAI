import { Router } from "express";
import { planRecommendation, chat, historyPrediction, updateExercises } from "../controllers/recommendation.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyJWTandPremium } from "../middlewares/authPremium.middleware.js";

const recommendationrouter = Router();

recommendationrouter.route("/planrecommendation").post(verifyJWT, planRecommendation);
recommendationrouter.route("/historyprediction").get(verifyJWTandPremium, historyPrediction);
recommendationrouter.route("/chat").post(verifyJWT, chat);
recommendationrouter.route("/updateexercises").post(verifyJWTandPremium, updateExercises);

export default recommendationrouter;