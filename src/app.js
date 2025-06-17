import express from "express";
import env from "./config/dotenv.config.js";
import sessionRouter from "./routes/session.router.js";
import mongoose from "mongoose";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import session from "express-session";
import cookieParser from "cookie-parser";

const app = express();
const { PORT, URL_MONGO, SESSION_SECRET } = env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
    },
  })
);

app.use("/api/sessions", sessionRouter);

//Configuramos passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(URL_MONGO)
  .then(() => {
    app.listen(PORT, () => {
      console.log("app listening on port " + PORT);
    });
  })
  .catch((error) => console.error(error));
