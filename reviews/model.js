import mongoose from "mongoose";
import schema from "./schema.js"

const model = mongoose.model("MovieSchema", schema);
export default model;