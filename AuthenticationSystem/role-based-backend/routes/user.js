const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const verifyRole = require('../middleware/verifyRole');

router.get('/profile', verifyToken, verifyRole('User', 'Moderator', 'Admin'), (req, res) => {
  res.json({ message: `Hello ${req.user.username}, this is your profile page.` });
});

module.exports = router;
