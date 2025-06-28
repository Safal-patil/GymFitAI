import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import {uploadOnCloudinary} from "../utils/cloudinary.js";

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId);
        

        const accessToken = user.generateAccessToken();

        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token" + error)
    }
}


const registerUser = asyncHandler(async (req, res) => {


    const { email, password } = req.body
    

    if ([email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    const user = await User.create({
        email,
        password,
        
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

})

const loginUser = asyncHandler(async (req, res) => {


    const { email, password } = req.body
    

    if ( !email) {
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({
        $or: [{ email }]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged In Successfully"
            )
        )

})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")

        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefereshTokens(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"))
})


const getCurrentUser = asyncHandler(async (req, res) => {
    const temp_user = req.user;
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            temp_user,
            "User fetched successfully"
        ))
})

const updateUserprofile  = asyncHandler(async (req, res)=>{
    
    const { profile, preferences, strengthInfo} = req.body.input;
    
    if(!profile || !preferences || !strengthInfo){
        throw new ApiError(400, "All fields are required")
    }
   
    
   

    const userProfile = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                strengthInfo :strengthInfo,
                profile : profile,
                preferences : preferences
            }
        },
        {
            new: true
        }
    )

    

    if(!userProfile){
        throw new ApiError(400, "Error Occured while Updating User Profile!")
    }

     return res
        .status(200)
        .json(new ApiResponse(200,  userProfile, 
        "Account details updated successfully")
    )

    
});

const updateAccountDetails = asyncHandler(async (req, res) => {
    const {email, age, name, height, weight, gender,  bodyFat, bodyType} = req.body.input;
    
    const requiredFields = [email, age, name, height, weight, gender, bodyFat, bodyType];
    if (requiredFields.some(field => field === undefined)) {
        throw new ApiError(400, "All fields are required");
    }


     const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                email: email,
                "profile.age": age,
                "profile.name": name,
                "profile.heightCm": height,
                "profile.weightKg": weight,
                "profile.gender": gender,
                "profile.bodyfat": bodyFat,
                "profile.bodytype": bodyType
            }
        },
        { new: true }
    ).select("-password");

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Account details updated successfully"))
});

const addpushNotification = asyncHandler(async (req, res) => {
    const { token } = req.body;

    if (!token) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                token: token
            }
        },
        { new: true }

    ).select("-password")

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Account details updated successfully"))
});

const workoutPhotosUpload = asyncHandler(async (req, res) => {
  const workoutphotos = req.files;

  if (!workoutphotos || workoutphotos.length === 0) {
    throw new ApiError(400, "Workout photos are required");
  }

  await Promise.all(
    workoutphotos.map(async (image) => {
      const imageLocalPath = image.path;
      const image_url = await uploadOnCloudinary(imageLocalPath);

      if (!image_url) {
        throw new ApiError(400, "Image upload failed");
      }

      await User.findByIdAndUpdate(req.user?._id, {
        $push: {
          workoutPhotos: {
            url: image_url.url,
            date: new Date().toISOString().split("T")[0],
          },
        },
      });
    })
  );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Workout photos uploaded successfully"));
});

const getworkoutPhotos = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user?._id)
    return res
        .status(200)
        .json(new ApiResponse(200, user.workoutPhotos, "Workout photos fetched successfully")) 
    }
);

export { registerUser, loginUser, logoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser,updateUserprofile, updateAccountDetails, addpushNotification, getworkoutPhotos, workoutPhotosUpload, generateAccessAndRefereshTokens };