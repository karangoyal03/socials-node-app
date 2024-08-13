import model from "./model.js";

export const createUser = (user) => {
  delete user._id;
  return model.create(user);
};

export const findAllUsers = () => model.find();

export const findUserById = (userId) =>
  model
    .findOne({ loginId: userId })
    .populate("following")
    .populate("followers")
    .exec();

export const findUserByIdOnly = async (_id) => {
  try {
    const user = await model
      .findOne({ _id: _id })
      .populate("following")
      .populate("followers")
      .exec();
    return user;
  } catch (error) {
    console.error("Failed to find user by ID:", error);
    throw error;
  }
};

export const findUserByUsername = async (username) => {
  console.log(username);
  console.log(await model.findOne({ username: username }));
};

export const findUserByCredentials = async (username, password) =>
  await model.findOne({ username, password });

export const updateUser = (userId, user) =>
  model.updateOne({ loginId: userId }, { $set: user });

export const deleteUser = (userId) => model.deleteOne({ loginId: userId });

export const updateFollower = async (userId, _id) => {
  await model.updateOne({ _id: userId }, { $push: { following: _id } });
  await model.updateOne({ _id: _id }, { $push: { followers: userId } });
};

export const updateUnFollowing = async (userId, _id) => {
  await model.updateOne({ _id: userId }, { $pull: { following: _id } });
  await model.updateOne({ _id: _id }, { $pull: { followers: userId } });
};

export const findUsersByRole = (role) => model.find({ role: role });
