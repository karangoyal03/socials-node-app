import * as dao from "./dao.js";

export default function ReviewRoutes(app) {
  const createReview = async (req, res) => {
    const review = await dao.createReview(req.body);
    res.json(review);
  };

  const findAllReviews = async (req, res) => {
    const users = await dao.findAllReviews();
  };

  const findReviewById = async (req, res) => {
    const user = await dao.findReviewByUserId(req.params.userId);
    res.json(user);
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

  app.post("/api/reviews", createReview);
  app.get("/api/reviews", findAllReviews);
  app.get("/api/reviews/:userId", findReviewById);
  app.put("/api/reviews/:userId", updateReview);
  app.delete("/api/reviews/:userId", deleteReview);
}
