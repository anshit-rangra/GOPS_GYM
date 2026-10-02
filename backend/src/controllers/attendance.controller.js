import ENV from "../config/config.js"
import attendanceModel from "../models/attendance.model.js"


async function markAttendance(req, res) {
    const secret = req.query.secret || ""

    if(secret !== ENV.QR_SECRET) return res.status(401).json({ message: "Unauthorized" })

    await attendanceModel.create({ user:req.user.userId })

    res.status(201).json({ message: "Attendance marked successfully" })

}

async function getMyAttendance(req, res) {

    const attendanceSheet = await attendanceModel.find({ user:req.user.userId })

    res.status(200).json({ message: "Attendance record fetch successfully", data:{
        record: attendanceSheet
    } })

}

async function getUserAttendance(req, res){
    const userId = req.params.userId;

     if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({
                    message: "Invalid user ID"
            });
        }

    const attendanceRecord = await attendanceModel.find({ user:userId })

    res.status(200).json({ message: "Attendance record fetch successfully", data: {
        record: attendanceRecord
    }})

}

export default {
    markAttendance,
    getMyAttendance,
    getUserAttendance
}