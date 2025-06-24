import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String},// cloudinary url
  profile: {
    name: String,
    gender: { type: String, enum: ['male','female','other'] },
    age: Number,
    weightKg: Number,
    heightCm: Number,
    bodyfat : Number,
    experienceLevel: { type: String, enum: ['beginner','intermediate','advanced'] },
    maxPushups: Number,
    maxPullups: Number,
    maxSquats: Number
  },
  premiumExpiry: { type: Date , default: null},
  tier: { type: String, enum: ['free','premium'], default: 'free' },
  preferences: { 
    goal : String,
    daysPerWeek: Number, 
    planStyle: String,
    },
  createdAt: Date,
  updatedAt: Date,
  refreshToken:{type: String, default: null},
  deviceToken : {type: String, default: null}
});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    console.log(process.env.ACCESS_TOKEN_SECRET, "access token secret");
    console.log(process.env.ACCESS_TOKEN_EXPIRY, "access token expiry");
    
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY ?? "1d"
        }
    )

}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
           
        }
    )
    
}

export const User = mongoose.model("User", userSchema)
