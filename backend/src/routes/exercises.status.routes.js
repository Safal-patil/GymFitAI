import {
    ExercisesbyDay,
    ExercisebyUser,
    Exerciseupdated,
    CaloriesByExercises
} from "../controllers/exercises.status.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const exercisestatusrouter = Router();

exercisestatusrouter.route("/exercisesbyday").post(verifyJWT, ExercisesbyDay)
exercisestatusrouter.route("/exercisebyuser").get(verifyJWT, ExercisebyUser)
exercisestatusrouter.route("/caloriesbyexercises").get(verifyJWT, CaloriesByExercises)
exercisestatusrouter.route("/exerciseupdated").post(verifyJWT, Exerciseupdated)



export default exercisestatusrouter;