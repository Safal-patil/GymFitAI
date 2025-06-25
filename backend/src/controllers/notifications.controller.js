import { Notification } from "../models/notification.model";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getNotifications = asyncHandler(async(req, res) => {
    const userId = req?.user?._id;
    day.setHours(0, 0, 0, 0);

    const nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);

    const notifications = await Notification.find({ 
        userId: userId,
        date: {
        $gte: day,
        $lt: nextDay
    }
    });

    if(!notifications){
        throw new ApiError(400, "Unable to fetch notifications");
    }
    res.status(200).
    json(new ApiResponse(
        true,
        "Notifications fetched successfully!",
        notifications
    ))
});

const addNotification = asyncHandler(async(req, res)=>{
    const userId = req?.user?._id;

    const newNotification = await Notification.create({
        userId: userId,
        message: req.body.message,
        date: req.body.date
    });
    
})


export {
    getNotifications,
    addNotification};