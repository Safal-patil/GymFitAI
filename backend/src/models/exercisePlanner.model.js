import mongoose, { Schema, Types, model } from "mongoose";

const PlannerSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: true },

  days: [
    {
      date: { type: Date, required: true },
      exercises: [{ type: Types.ObjectId, ref: 'Exercise' }]
    }
  ],

  nutrition: [{ type: String }],
  recommendations: [{ type: String }],
  goals: [{ type: String }],
  prediction: [{ type: String }],

  createdAt: { type: Date, default: Date.now },

  expireAt: {
    type: Date,
    default: () => new Date(Date.now() + 7* 24 * 60 * 60 * 1000), // 30 days from creation
    index: { expireAfterSeconds: 0 }
  }
});

export const Planner = model('Planner', PlannerSchema);

