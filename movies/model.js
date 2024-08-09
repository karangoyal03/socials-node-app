import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("ShowModel", schema);
export default model;