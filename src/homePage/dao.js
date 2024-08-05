const Content = require('./model');

const getAllContent = async () => {
  return await Content.find().sort({ createdAt: -1 }).limit(5);
};

const getUserContent = async (userId) => {
  return await Content.find({ userId }).sort({ createdAt: -1 }).limit(5);
};

module.exports = {
  getAllContent,
  getUserContent
};
