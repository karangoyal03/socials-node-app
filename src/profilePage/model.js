const mongoose = require('mongoose');
const ProfileSchema = require('./schema');

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
