import mongoose from "mongoose";
import userModel from "../models/user.model.js";


async function getAuthorizedUsers(req, res) {
    const limit = Number(req.query.limit) || 10;
    const skip = Number(req.query.skip) || 0;

    const users = await userModel
        .find({
            isAuthorized: true,
            _id: { $ne: req.user._id }
        })
        .limit(limit)
        .skip(skip * limit);

    res.status(200).json({
        message: "Users fetched successfully",
        data: {
            users
        }
    });
}

async function getUnauthorizedUsers(req, res){
    const limit = Number(req.query.limit) || 10;
    const skip = Number(req.query.skip) || 0;

    const users = await userModel
        .find({ isAuthorized: false })
        .limit(limit)
        .skip(skip * limit);

    res.status(200).json({
        message: "Users fetched successfully",
        data: {
            users
        }
    });
}

async function authorizeUser(req, res) {
    try {
        const { userId } = req.params;

        const user = await userModel.findOneAndUpdate(
            { _id: userId },
            { isAuthorized: true }
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User Authorized"
        });

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function unauthorizeUser(req, res) {
    try {
        const { userId } = req.params;

        const user = await userModel.findOneAndUpdate(
            { _id: userId },
            { isAuthorized: false }
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User unauthorized"
        });

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function getUser(req, res){
    try {
        const { userId, phoneNumber } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: "Invalid user ID"
        });
}

        const user = await userModel.findOne({
            $or: [
                { _id: userId },
                { phoneNumber: phoneNumber }
            ]
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User Authorized"
        });

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export default {
    getAuthorizedUsers,
    getUnauthorizedUsers,
    authorizeUser,
    unauthorizeUser,
    getUser
}