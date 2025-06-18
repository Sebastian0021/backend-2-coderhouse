import express from "express";
import env from "./config/dotenv.config.js";
import sessionRouter from "./routes/session.router.js";
import userRouter from "./routes/user.router.js";
import connectDB from "./config/db.config.js";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import productRouter from "./routes/product.router.js";

const app = express();
const { PORT, URL_MONGO, SESSION_SECRET } = env;

const connection = connectDB(URL_MONGO);

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
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.listen(PORT, () => {
  console.log("app listening on port " + PORT);
});
