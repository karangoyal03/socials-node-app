import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    userId: { type: String, required: true },
    // movieId :{ type: String, required: true },
    username : String,
    rating: Number,
    comment: String,
    date: Date,
  },
  { collection: "reviews" }
);

export default reviewSchema;
