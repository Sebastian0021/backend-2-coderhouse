import passport from "passport";
import jwt from "passport-jwt";
import local from "passport-local";
import { isValidPassword } from "../utils/bcrypt.js";
import env from "../config/dotenv.config.js";
import { cookieExtractor } from "../utils/cookieExtractor.js";
import UserRepository from "../repositories/session.repository.js";

const userService = new UserRepository();
const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userService.getUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export const initializePassport = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: env.JWT_SECRET,
      },
      async (jwt_payload, done) => {
        try {
          const user = await userService.getUserById(jwt_payload.id);
          if (!user) {
            return done(null, false, { message: "User not found" });
          }
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await userService.getUserByEmail(email);
          if (!user) {
            return done(null, false, { message: "User not found" });
          }
          if (!isValidPassword(user, password)) {
            return done(null, false, { message: "Incorrect password" });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, email, password, done) => {
        try {
          const { first_name, last_name, age } = req.body;
          const user = await userService.getUserByEmail(email);
          if (user) {
            return done(null, false, { message: "User already exists" });
          }

          const newUser = await userService.createUser({
            first_name,
            last_name,
            email,
            age,
            password,
          });

          return done(null, newUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
