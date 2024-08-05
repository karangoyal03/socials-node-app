const express = require('express');
const { getProfile, getCurrentProfile, updateProfile } = require('../controllers/profileController');
const router = express.Router();

router.get('/:id', getProfile);
router.get('/', getCurrentProfile);
router.put('/:id', updateProfile);

module.exports = router;
