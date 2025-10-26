const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Hardcoded users with roles
const users = [
  { username: 'admin', password: 'admin123', role: 'Admin' },
  { username: 'moderator', password: 'mod123', role: 'Moderator' },
  { username: 'user', password: 'user123', role: 'User' }
];

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;
