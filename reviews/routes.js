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
    const { userId } = req.params;
    const status = await dao.updateReview(userId, req.body);
    res.json(status);
  };

  const deleteReview = async (req, res) => {
    const status = await dao.deleteReview(req.params.userId);
    res.json(status);
  };

  const findReviewByTitle = async (req, res) => {
    const { title } = req.params;
    const review = await dao.findReviewByTitle(title);
    res.json(review);
  };

  app.post("/api/reviews", createReview);
  app.get("/api/reviews", findAllReviews);
  app.get("/api/reviews/:userId", findReviewById);
  app.put("/api/reviews/:userId", updateReview);
  app.delete("/api/reviews/:userId", deleteReview);
  app.get("/api/reviews/:title", findReviewByTitle);
}
