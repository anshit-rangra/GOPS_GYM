import express from 'express'
import authRouter from '../routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import { authAdminMiddleware } from '../middlewares/auth.middleware.js'
import adminRouter from '../routes/admin.routes.js'
import attendanceRouter from '../routes/attendance.routes.js'

const app = express()

app.use(express.json())

app.use(cookieParser())

app.get("/", (req, res) => {
    res.status(200).send("Server is working properly")
})

app.use("/api/auth", authRouter)
app.use("/api/admin", authAdminMiddleware, adminRouter)
app.use("/api/attendance", attendanceRouter)



export default app;