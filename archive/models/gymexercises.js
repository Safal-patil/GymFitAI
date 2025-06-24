import mongoose from 'mongoose';

const GymExerciseSchema = new mongoose.Schema({
  Title: String,
  Desc: String,
  Type: String,
  BodyPart: String,
  Equipment: String,
  Level: String,
  Rating: Number,
  RatingDesc: String
});

const GymExercise = mongoose.model('GymExercise', GymExerciseSchema);

export default GymExercise;
