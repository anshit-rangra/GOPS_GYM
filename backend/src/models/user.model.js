import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    }, 
    age: {
        type: Number,
        required: true,
        min: 1,
        max: 120
    },
    phoneNumber: {
        type: String,
        required: true,
        match: /^[6-9]\d{9}$/
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        url: { type: String, required: true },
        picId: { type: String, required: true }
    },
    isAuthorized: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: [ "user", "admin" ],
        default: "user"
    },
    refreshToken: {
        type: String,
        default: ""
    }
})

const userModel = mongoose.model("User", userSchema)

export default userModel;