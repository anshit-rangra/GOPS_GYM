import express from "express"
import adminController from "../controllers/admin.controller.js"


const adminRouter = express.Router()

/**
 *  @GET /api/admin/authorized/users?limit=X&skip=Y
 */

adminRouter.get("/authorized/users", adminController.getAuthorizedUsers)

/**
 *  @GET /api/admin/unauthorized/users?limit=X&skip=Y
 */

adminRouter.get("/unauthorized/users", adminController.getUnauthorizedUsers)

/**
 * @Post /api/admin/authorize/user/:userId
 */

adminRouter.post("/authorize/user/:userId", adminController.authorizeUser)

/**
 * @Post /api/admin/unauthorize/user/:userId
 */

adminRouter.post("/unauthorize/user/:userId", adminController.unauthorizeUser)

/**
 *  @GET /api/admin/get/user/:userId
 */

adminRouter.get("/get/user", adminController.getUser)

/**
 *  @GET /api/admin/delete/user/:userId
 */

adminRouter.delete("/delete/user/:userId", adminController.deleteUserAccount)



export default adminRouter