import mongoose from "mongoose";
const showSchema = new mongoose.Schema(
  {
    Title: String,
    Year: String,
    Rated: String,
    Released: Date,
    Runtime: String,
    Genre: String,
    Director: String,
    Writer: String,
    Actors: [{ type: String }],
    Plot: String,
    Language: String,
    Country: String,
    Awards: String,
    Poster: String,
    Ratings: [
      {
        Source: String,
        Value: String,
      },
    ],
    imdbRating: String,
    Type: String,
    totalSeasons: String,
  },
  { collection: "movies" }
);

export default showSchema;
