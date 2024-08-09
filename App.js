// import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import session from "express-session";
import ShowRoutes from "./movies/routes.js";
import UserRoutes from "./users/routes.js";
import ReviewRoutes from "./reviews/routes.js";
const app = express();

const CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/socials";

mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  bufferCommands: false,
});

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "socials",
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));

app.use(
  cors({
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
  })
);
app.use(express.json());
ShowRoutes(app);
UserRoutes(app);
ReviewRoutes(app);

app.listen(process.env.PORT || 4000, () => {
  console.log("Server is listening on port 4000");
});
