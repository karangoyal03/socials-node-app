import model from "./model.js";

export const createReview = (review) => {
  delete review._id;
  return model.create(review);
};

export const findAllReviews = () => model.find();

export const findReviewByUserId = (userId) => model.find({ userId: userId });

export const findReviewByTitle = async(title) => {
    console.log(title ,'hello')
    await model.find({ title: title });}

export const findReviewByUsername = (username) =>
  model.findOne({ username: username });

export const updateReview = async (_id, review) => {
  console.log(_id, review);
  await model.findByIdAndUpdate(_id, review);
};

export const deleteReview = (_id) => model.deleteOne({ _id: _id });
