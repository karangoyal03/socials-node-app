import * as dao from "./dao.js";

export default function ReviewRoutes(app) {
  const createReview = async (req, res) => {
    const review = await dao.createReview(req.body);
    res.json(review);
  };

  const findAllReviews = async (req, res) => {
    const reviews = await dao.findAllReviews();
    res.json(reviews);
  };

  const findReviewById = async (req, res) => {
    const review = await dao.findReviewByUserId(req.params.userId);
    res.json(review);
  };

  const updateReview = async (req, res) => {
    const { _id } = req.params;
    console.log(req.params);
    const status = await dao.updateReview(_id, req.body);
    res.json(status);
  };

  const deleteReview = async (req, res) => {
    const status = await dao.deleteReview(req.params._id);
    res.json(status);
  };

  const findReviewByTitle = async (req, res) => {
    console.log("show me the title",req.params.title);
    const review = await dao.findReviewByTitle(decodeURIComponent(req.params.title));
    res.json(review);
  };

  const findReviewByMovieId = async(req,res)=>{
    const review = await dao.findReviewByMovieId(req.params.movieId);
    res.json(review);
  }

  app.post("/api/reviews", createReview);
  app.get("/api/reviews", findAllReviews);
  app.get("/api/reviews/:userId", findReviewById);
  app.put("/api/reviews/:_id", updateReview);
  app.delete("/api/reviews/:_id", deleteReview);
  app.get("/api/reviews/title/:title", findReviewByTitle);
  app.get("/api/reviews/movie/:movieId",findReviewByMovieId)
}
