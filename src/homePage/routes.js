const express = require('express');
const router = express.Router();
const { getLatestContent, getUserLatestContent } = require('../controllers/contentController');

router.get('/latest-content', getLatestContent);
router.get('/user/:id/latest-content', getUserLatestContent);

module.exports = router;
