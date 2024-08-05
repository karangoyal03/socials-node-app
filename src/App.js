const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { checkUser } = require('./utils/auth');
const contentRoutes = require('./homePage/routes');
const userRoutes = require('./users/routes');
const profileRoutes = require('./profilePage/routes');

const app = express();

// Use CORS middleware
app.use(cors());
console.log('Initializing Express app...'); 

// Parse JSON requests
app.use(bodyParser.json());

// Public routes
app.use('/api/users', userRoutes);

// Use authentication middleware for protected routes
app.use('/api', checkUser, contentRoutes);
app.use('/api/profile', profileRoutes);


module.exports = app;
