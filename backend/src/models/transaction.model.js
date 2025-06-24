import mongoose from 'mongoose';
const { Schema, model, Types } = mongoose;

const TransactionSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: true },

  planAmount: { type: Number, required: true },           // Price of the plan
  amount: { type: Number, required: true },               // Amount actually paid (can include discount or tax)
  amountInWords: { type: String, required: true },        // "One thousand two hundred rupees only"

  transactionDate: { type: Date, required: true },        // Date of transaction
  transactionId: { type: String, required: true, unique: true }, // e.g., Razorpay/Stripe ID

  platform: { type: String, required: true },             // e.g., "Razorpay", "Stripe", "Paytm"

  status: {
    type: String,
    enum: ['success', 'failed', 'pending', 'refunded'],
    default: 'pending'
  },

  createdAt: { type: Date, default: Date.now }
});

export const Transaction = model('Transaction', TransactionSchema);
