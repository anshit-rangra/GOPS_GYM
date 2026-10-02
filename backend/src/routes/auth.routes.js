import express from "express";
import authController from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import { upload } from "../middlewares/upload.middleware.js";
import { authUserMiddleware } from "../middlewares/auth.middleware.js";

/**
 *  API --> /api/auth/
 */

const authRouter = express.Router();

/**
 * @POST Register user  /api/auth/register 
 * 
 */

authRouter.post("/register", upload.single("profilePic"), registerValidator,  authController.registerUser)


/**
 * @POST Login user  /api/auth/login 
 * 
 */

authRouter.post("/login", loginValidator,  authController.loginUser)

/**
 * @GET Get user /api/auth/me
 */

authRouter.get("/me", authUserMiddleware, authController.getMe)

/**
 * @GET Get Access Token /api/auth/refresh
 */

authRouter.get("/refresh", authController.getAccessToken)

/**
 *  @DELETE Delete Account /api/auth/delete/account
 */

authRouter.delete("/delete/account", authUserMiddleware, authController.deleteMyAccount)

export default authRouter;