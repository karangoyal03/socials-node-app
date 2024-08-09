import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    userId: { type: String, required: true },
    username : String,
    rating: String,
    comment: String,
    createdAt: Date,
  },
  { collection: "shows" }
);

export default reviewSchema;
