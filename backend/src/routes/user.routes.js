import { Router } from "express";
import { registerUser, loginUser, logoutUser, refreshAccessToken, 
    changeCurrentPassword, getCurrentUser,updateUserprofile, 
    updateAccountDetails, addpushNotification, getworkoutPhotos, workoutPhotosUpload } from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userrouter = Router();

userrouter.route("/register").post(registerUser)

userrouter.route("/login").post(loginUser)

//secured routes
userrouter.route("/logout").post(verifyJWT,  logoutUser)
userrouter.route("/refresh-token").post(refreshAccessToken)
userrouter.route("/change-password").post(verifyJWT, changeCurrentPassword)
userrouter.route("/current-user").get(verifyJWT, getCurrentUser)
userrouter.route("/update-account").patch(verifyJWT, updateAccountDetails)
userrouter.route("/adddevicetoken").post(verifyJWT, addpushNotification)
userrouter.route("/updateprofile").post(
    verifyJWT,
    updateUserprofile
)
userrouter.route("/workoutphotos").post(
    verifyJWT,
    upload.array(
        "workoutphotos"
    ),
    workoutPhotosUpload
)
userrouter.route("/getworkoutphotos").get(verifyJWT, getworkoutPhotos);


export default userrouter;