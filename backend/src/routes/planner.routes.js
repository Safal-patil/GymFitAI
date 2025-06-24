import { Router } from "express";
import {plannerbyUser, plannerReport} from "../controllers/planner.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {verifyJWTandPremium} from "../middlewares/authPremium.middleware.js";

const plannerrouter = Router();

plannerrouter.route("/plannerbyuser").get(verifyJWT, plannerbyUser);
plannerrouter.route("/plannerreport").get(verifyJWTandPremium, plannerReport);


export default plannerrouter;