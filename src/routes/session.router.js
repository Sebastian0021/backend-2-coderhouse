import { Router } from "express";
import {
  validateRegister,
  validateLogin,
} from "../middlewares/validation.middleware.js";
import { passportCall } from "../utils/passportCall.js";
import { generateToken } from "../utils/jwt.js";
import env from "../config/dotenv.config.js";

const router = Router();

//register
router.post(
  "/register",
  passportCall("register"),
  validateRegister,
  async (req, res) => {
    try {
      console.log("User registered");
      res.redirect("/login");
    } catch (error) {
      console.log(`Error al registrar el usuario: ${error}`);
      res.status(500).send("Error al registrar el usuario");
    }
  }
);

//login

router.post(
  "/login",
  passportCall("login"),
  validateLogin,
  async (req, res) => {
    try {
      const user = req.user;

      const token = generateToken(user);

      res
        .cookie("token", token, {
          httpOnly: true,
          maxAge: env.COOKIE_AGE,
        })
        .send({
          status: "success",
          message: "User logged in successfully",
          token,
        });
    } catch (error) {
      console.log(`Error al iniciar sesión: ${error}`);
      res.status(500).send("Error al iniciar sesión");
    }
  }
);

router.get("/current", passportCall("jwt"), async (req, res) => {
  res.send({ status: "success", payload: req.user });
});

router.get("/logout", async (req, res) => {
  res.clearCookie("token");
  res.send({ status: "success", message: "User logged out successfully" });
});

export default router;
