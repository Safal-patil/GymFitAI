import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        console.log(token);
        
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        console.log( process.env.ACCESS_TOKEN_SECRET)
        let decodedToken;
        try {
             decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        } catch (error) {
            console.log(error, "error" );
            
        }
        console.log(decodedToken, "decoded token");
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        
        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }
        console.log(user, "user");
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }

})