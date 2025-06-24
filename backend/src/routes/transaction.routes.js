import { Router } from "express";

import {transactionbyUser,
    saveTrasaction} from "../controllers/transaction.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const transactionrouter = Router();

transactionrouter.route("/transactionbyuser").get(verifyJWT, transactionbyUser);
transactionrouter.route("/savetransaction").post(verifyJWT, saveTrasaction);

export default transactionrouter;