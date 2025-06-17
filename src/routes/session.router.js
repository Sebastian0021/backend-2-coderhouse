import { Router } from "express";
import {
  validateRegister,
  validateLogin,
} from "../middlewares/validation.middleware.js";
import { passportCall } from "../utils/passportCall.js";
import {
  register,
  login,
  getCurrentUser,
  logout,
} from "../controllers/session.controller.js";

const router = Router();

router.post("/register", passportCall("register"), validateRegister, register);

router.post("/login", passportCall("login"), validateLogin, login);

router.get("/current", passportCall("jwt"), getCurrentUser);

router.get("/logout", logout);

export default router;
