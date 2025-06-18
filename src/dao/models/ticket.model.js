import mongoose from "mongoose";

const collection = "Ticket";

const schema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  purchase_datetime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    ref: "User",
    required: true,
  },
});

export default mongoose.model(collection, schema);
