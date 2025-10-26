const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const verifyRole = require('../middleware/verifyRole');

router.get('/dashboard', verifyToken, verifyRole('Admin'), (req, res) => {
  res.json({ message: `Welcome Admin ${req.user.username} to the admin dashboard!` });
});

module.exports = router;
