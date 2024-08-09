import model from "./model.js";

export const createReview = (review) => {
  delete review._id;
  return model.create(review);
};

export const findAllReviews = () => model.find();

export const findReviewByUserId = (userId) => model.findOne({ userId: userId });

export const findReviewByTitle = (title) => model.find({ title: title });

export const findReviewByUsername = (username) =>
  model.findOne({ username: username });

export const updateReview = (userId, review) =>
  model.updateOne({ userId: userId }, { $set: review });

export const deleteReview = (userId) => model.deleteOne({ userId: userId });
