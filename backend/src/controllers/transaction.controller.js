import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Transaction } from "../models/transaction.model.js";
import mongoose from "mongoose";

const transactionbyUser = asyncHandler(async(req, res) => {
    const userId = req?.user?._id || new mongoose.Types.ObjectId('68592b2cdbf5572dbfda8c1e');

    const transaction = await Transaction.find({ userId: userId }).sort({ createdAt: -1 });

    if(!transaction){
        throw new ApiError(400, "Unable to fetch transaction");
    }

    return res.status(200).
    json(new ApiResponse(
        true,
        "Transaction fetched successfully!",
        transaction
    ))
});

const saveTrasaction = asyncHandler(async(req, res) => {
    const userId = req?.user?._id || new mongoose.Types.ObjectId('68592b2cdbf5572dbfda8c1e');
    const transaction = req.body.transaction;

    if(!transaction){
        throw new ApiError(400, "Unable to store transaction!"); 
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            $set: {
            premiumExpiry: transaction.premiumExpiry,
            tier: "premium"
            }
        },
        { new: true } 
    );


    const created_transaction = await Transaction.create({
        userId : userId,
        planAmount : transaction.planAmount,
        amount : transaction.amount,
        amountInWords : transaction.amountInWords,
        transactionDate : transaction.transactionDate,
        transactionId : transaction.transactionId,
        platform : transaction.platform,
        status : transaction.status
    })

    if(!created_transaction || !updatedUser){
        throw new ApiError(400, "Unable to store transaction!");    
    }

    return res
        .status(200)
        .json(new ApiResponse(true, "Transaction created successfully!", created_transaction));
});

export {
    transactionbyUser,
    saveTrasaction
}