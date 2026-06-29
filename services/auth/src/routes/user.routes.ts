import Router from "express";
import { googleLoginController, loginController, registerController, addUserRole, myProfile } from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = Router();

router.post("/login", loginController);

router.post("/register", registerController);

router.post("/google-login", googleLoginController);

router.put("/add/role", isAuth, addUserRole);

router.get("/me",isAuth, myProfile);

export default router;