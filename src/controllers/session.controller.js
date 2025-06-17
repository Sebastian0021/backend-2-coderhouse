import { generateToken } from "../utils/jwt.js";
import env from "../config/dotenv.config.js";
export const getCurrentUser = async (req, res) => {
  res.send({ status: "success", payload: req.user });
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.send({ status: "success", message: "User logged out successfully" });
};

export const login = async (req, res) => {
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
};

export const register = async (req, res) => {
  try {
    console.log("User registered");
    res.redirect("/login");
  } catch (error) {
    console.log(`Error al registrar el usuario: ${error}`);
    res.status(500).send("Error al registrar el usuario");
  }
};
