require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json()); // parse JSON bodies

// Routes
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
