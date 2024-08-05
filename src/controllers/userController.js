const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByUsername } = require('../users/dao');
const Profile = require('../profilePage/model');

const registerUser = async (req, res) => {
  const { username, password, role, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({ username, password: hashedPassword, role });
    console.log("newUser"+newUser);

    // Create a profile for the new user
    const newProfile = new Profile({
      userId: newUser._id,
      username: newUser.username,
      email: email || '',
      phone: '',
      bio: '',
      following: [],
      followers: [],
      bookmarks: [],
      comments: [],
      reviews: []
    });
    await newProfile.save();
    console.log("newprofile"+newProfile);
    res.status(201).json(newUser); // Ensure correct response
  } catch (error) {
    console.error('Error registering user:', error); // Log the error
    res.status(500).json({ error: 'Error registering user' });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ token, user });
  } catch (error) {
    console.error('Error logging in user:', error); // Log the error
    res.status(500).json({ error: 'Error logging in user' });
  }
};

module.exports = {
  registerUser,
  loginUser
};
