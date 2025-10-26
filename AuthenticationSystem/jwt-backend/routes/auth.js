const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Hardcoded user for simplicity
const user = {
  username: 'admin',
  password: 'password123'
};

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username !== user.username || password !== user.password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;
