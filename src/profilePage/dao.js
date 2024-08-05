const mongoose = require('mongoose'); 
const Profile = require('./model');
const User = require('../users/model');

const getProfileById = async (id) => {
    console.log(`DAO: Fetching profile by userId: ${id}`); // Add logging
    let profile = await Profile.findOne({ userId: id });
    if (!profile) {
      console.log(`DAO: Profile not found, creating new profile for userId: ${id}`); // Add logging
      const user = await User.findById(id);
      if (user) {
        profile = new Profile({
          userId: user._id,
          username: user.username,
          email: user.email || '',
          phone: '',
          bio: '',
          following: [],
          followers: [],
          bookmarks: [],
          comments: [],
          reviews: []
        });
        await profile.save();
        console.log(`DAO: New profile created for userId: ${id}`); // Add logging
      }
    }
    return profile;
  };

const getCurrentUserProfile = async (userId) => {
  return await getProfileById(userId);
};

const updateUserProfile = async (id, updateData) => {
  return await Profile.findOneAndUpdate({ userId: id }, updateData, { new: true });
};

module.exports = {
  getProfileById,
  getCurrentUserProfile,
  updateUserProfile
};
