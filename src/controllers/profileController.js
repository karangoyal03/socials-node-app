const { getProfileById, getCurrentUserProfile, updateUserProfile } = require('../profilePage/dao');

const getProfile = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(`Fetching profile for userId: ${id}`); // Add logging
      const profile = await getProfileById(id);
      if (!profile) {
        console.log('Profile not found'); // Add logging
        return res.status(404).json({ error: 'Profile not found' });
      }
      console.log('Profile found:', profile); // Add logging
      res.json(profile);
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  };

const getCurrentProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await getCurrentUserProfile(userId);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch current profile' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedProfile = await updateUserProfile(id, updateData);
    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

module.exports = {
  getProfile,
  getCurrentProfile,
  updateProfile
};
