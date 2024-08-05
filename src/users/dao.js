const User = require('./model');

const createUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

const findUserByUsername = async (username) => {
  return await User.findOne({ username });
};

module.exports = {
  createUser,
  findUserByUsername
};
