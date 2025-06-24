import mongoose, { Mongoose } from "mongoose";
import { GymExercise } from "../models/exercise.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const searchExercisesByTitle = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query || query.trim() === "") {
    throw new ApiError(400, "Search query is required");
  }


  const exercises = await GymExercise.find({
    Title: { $regex: query, $options: "i" }, // Case-insensitive substring match
  });

  return res
    .status(200)
    .json(new ApiResponse(true, "Exercises fetched successfully", exercises));
});

const getgymexercises = asyncHandler(async(req, res) =>{
    const exercises = await GymExercise.find();
    if(!exercises){
        throw new ApiError(400, "Unable to fetch Gym exercises");
    }

    res.status(200).
    json(new ApiResponse(
        200,
        "Gym exercises fetched successfully!",
        exercises
    ))
});

const getgymexercisesbyid = asyncHandler(async(req, res) => {
    const id = new mongoose.Types.ObjectId( req.params.id);

    const exercise = await GymExercise.findById(id);
    if(!exercise){
        throw new ApiError(400, "Unable to fetch Gym exercise");
    }

    res.status(200).
    json(new ApiResponse(
        200,
        "Gym exercise fetched successfully!",
        exercise
    )

)
});

const addgymexercises = asyncHandler(async(req, res) => {
    const exercise = req.body.exercise;

    if(!exercise){
        throw new ApiError(400, "Unable to store exercise!"); 
    }

    const created_exercise = await GymExercise.create(exercise);

    if(!created_exercise){
        throw new ApiError(400, "Unable to store exercise!");
    }

    res.status(200).
    json(new ApiResponse(
        true,
        "Exercise created successfully!",
        created_exercise
    ))
});

export {getgymexercises, getgymexercisesbyid, addgymexercises, searchExercisesByTitle};