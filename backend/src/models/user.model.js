import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  workoutPhotos: [{
    url: {type: String},
    date: {type: String}
  }],// cloudinary url
  avatar:{type:String},
  profile: {
    name: {type: String, default: ""},
    gender: { type: String, enum: ['male','female','other'] },
    age: {type : Number, default: 0},
    bodytype: {type: String, default: ""},
    weightKg: {type : Number, default: 0},
    heightCm: {type : Number, default: 0},
    bodyfat : {type : Number, default: 0},
    experienceLevel: { type: String, enum: ['beginner','intermediate','advanced'] },
    currentStreak: {type : Number, default: 0},
    workoutsCompleted: {type : Number, default: 0},
    totalWorkouts: {type : Number, default: 0}
  },
  strengthInfo:{
    maxPushups: {type : Number, default: 0},
    maxPullups: {type : Number, default: 0},
    maxSquats: {type : Number, default: 0},
    maxBenchKg: {type : Number, default: 0},
    maxSquatkg: {type : Number, default: 0},
    maxDeadliftkg: {type : Number, default: 0}
  },
  premiumExpiry: { type: Date , default: null},
  tier: { type: String, enum: ['free','premium'], default: 'free' },
  preferences: { 
    goal : {type: String, default: ""},
    daysPerWeek: {type : Number, default: 0},
    planStyle: {type: String, default: ""},
    sessionDuration: {type : Number, default: 0},
    equipment: {type: String, default: ""},
    limitations: {type: String, default: ""},
    availableTime: {type: String, default: ""},
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
