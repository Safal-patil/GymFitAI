
import mongoose, { Schema } from "mongoose";

const GymExerciseSchema = new Schema({
  Title: String,
  Desc: String,
  Type: String,
  BodyPart: String,
  Equipment: String,
  Level: String,
  Rating: Number,
  RatingDesc: String,
});

export const GymExercise = mongoose.model("GymExercise", GymExerciseSchema);
