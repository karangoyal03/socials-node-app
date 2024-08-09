import model from "./model.js";

export const createShow = (show) => {
  delete show._id;
  return model.create(show);
};

export const findAllShows = () => model.find();

export const findShowByTitle = (title) => model.findOne({ Title: title });

export const updateShow = (title, show) =>
  model.updateOne({ Title: title }, { $set: show });

export const deleteShow = (userId) => model.deleteOne({ Title: title });
