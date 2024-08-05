const jwt = require('jsonwebtoken');

const checkUser = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.user = null;
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; 
    } catch (error) {
      req.user = null;
    }
  }
  next();
};

module.exports = { checkUser };
