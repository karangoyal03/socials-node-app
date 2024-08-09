import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    showId: { type: String, required: true },
    userId: { type: String, required: true },
    rating: String,
    comment: String,
    createdAt: Date,
  },
  { collection: "shows" }
);

export default reviewSchema;
