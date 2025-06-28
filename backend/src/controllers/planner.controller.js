import mongoose, { Mongoose } from "mongoose";
import { Planner } from "../models/exercisePlanner.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const plannerbyUser = asyncHandler(async(req, res) => {
    const userId = req?.user?._id;

    const planner = await Planner.find({ userId: userId }).sort({ createdAt: -1 });

    if(!planner){
        throw new ApiError(400, "Unable to fetch planner");
    }

    return res.status(200).
    json(new ApiResponse(
        true,
        planner,
        "Planner fetched successfully!",
        
    ))
});

const plannerReport = asyncHandler(async(req, res) => {
    const userId = req?.user?._id ;

    const planner = await Planner.find({ userId: userId }).sort({ createdAt: -1 });

    if(!planner){
        throw new ApiError(400, "Unable to fetch planner");
    }

    

    const report = {
        nutrition : planner[0].nutrition,
        recommendations : planner[0].recommendations,
        goals : planner[0].goals,
        prediction : planner[0].prediction
    };
    

    return res.status(200).
    json(new ApiResponse(
        true,
        report,
        "Planner report fetched successfully!",
        
    ))
});

export {plannerbyUser, plannerReport};