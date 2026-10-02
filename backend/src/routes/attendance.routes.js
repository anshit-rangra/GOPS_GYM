import express from "express"
import attendanceController from "../controllers/attendance.controller.js";
import { authUserMiddleware } from "../middlewares/auth.middleware.js";

const attendanceRouter = express.Router()

/**
 *  @POST Marking attendance /api/attendance/mark
 */

attendanceRouter.post("/mark", authUserMiddleware, attendanceController.markAttendance)


/**
 *  @GET Get my attendance record /api/attendance/record/me
 */

attendanceRouter.get("/record/me", authUserMiddleware, attendanceController.getMyAttendance)

/**
 *  @GET Get user attendance record by Admin /api/attendance/record/user/:userID
 */

attendanceRouter.get("/record/user/:userID", authUserMiddleware, attendanceController.getUserAttendance)



export default attendanceRouter;