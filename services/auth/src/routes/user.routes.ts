import Router from "express";
import { googleLoginController, loginController, registerController, addUserRole, myProfile } from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = Router();

router.post("/login", loginController);

/**
 * @description Register a new user
 * @route POST /api/auth/register
 * @access Public
 */

router.post("/register", registerController);

/**
 * @description Google login
 * @route POST /api/auth/google-login
 * @access Public
 */

router.post("/google-login", googleLoginController);

router.put("/add/role", isAuth, addUserRole);

router.get("/me",isAuth, myProfile);

export default router;