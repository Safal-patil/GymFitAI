import mongoose, { Schema, Types, model } from "mongoose";

const ExerciseSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  id: {type: Number},
  name: { type: String, required: true },
  title: { type: String },
  date: { type: Date, required: true },
  description: { type: String },
  shortDescription: { type: String },
  
  type: { type: String },
  bodyPart: { type: String },
  equipment: { type: String },

  level: { type: String },
  difficultyTag: { type: String },

  avgSets: { type: Number },
  avgReps: { type: Number },
  calorieBurnPerRep: { type: Number },

  status: {
    completedByUser: { type: Boolean, default: false },
    completePercent : { type: Number, default: 0 },
    totalSets: { type: Number, default: 0 },
    completedSets: { type: Number, default: 0 },
    totalReps: { type: Number, default: 0 },
    completedReps: { type: Number, default: 0 }
  },

  rating: { type: Number, min: 0, max: 5 },
  ratingDesc: { type: String },

  createdAt: { type: Date, default: Date.now }
});

export const Exercises =  model('Exercise', ExerciseSchema);