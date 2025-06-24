import { Router } from "express";

import { getgymexercises, getgymexercisesbyid, addgymexercises, searchExercisesByTitle } from "../controllers/exercises.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const gymrouter = Router();

gymrouter.route("/getgymexercises").get(verifyJWT, getgymexercises);
gymrouter.route("/gymexercises/:id").get(verifyJWT, getgymexercisesbyid);
gymrouter.route("/addgymexercises").post(verifyJWT, addgymexercises);
gymrouter.route("/search").get(verifyJWT,searchExercisesByTitle);

export default gymrouter;