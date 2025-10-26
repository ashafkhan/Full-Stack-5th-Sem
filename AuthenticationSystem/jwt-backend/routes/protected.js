const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

router.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.username} to the dashboard!` });
});

module.exports = router;
