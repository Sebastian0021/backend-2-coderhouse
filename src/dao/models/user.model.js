import mongoose from "mongoose";
import { createHash } from "../../utils/bcrypt.js";

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, unique: true },
  age: { type: Number, required: true },
  password: { type: String, required: true }, // This should be a hash
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "Carts" },
  role: { type: String, default: "user" },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = createHash(this.password);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
