const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const verifyRole = require('../middleware/verifyRole');

router.get('/management', verifyToken, verifyRole('Moderator', 'Admin'), (req, res) => {
  res.json({ message: `Welcome ${req.user.username} to the moderator management page!` });
});

module.exports = router;
