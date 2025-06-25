import mongoose, { Schema, model, Types} from "mongoose";

const Notifications = new Schema({
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    date: { type: Date, required: true },
    seen: { type: Boolean, default: false },
});

export const Notification = model('Notification', Notifications);