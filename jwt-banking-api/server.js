import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { verifyToken } from "./middleware/authMiddleware.js";

dotenv.config();
const app = express();
app.use(express.json());

// Hardcoded user (for demo)
const USER = { username: "user1", password: "pass123" };

// Simulated bank account
let account = {
  username: "user1",
  balance: 1000
};


app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== USER.username || password !== USER.password) {
    return res.status(401).json({ message: "Invalid username or password." });
  }

  // Generate JWT token
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ message: "Login successful.", token });
});


// View balance
app.get("/balance", verifyToken, (req, res) => {
  res.json({ username: req.user.username, balance: account.balance });
});

// Deposit money
app.post("/deposit", verifyToken, (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid deposit amount." });
  }

  account.balance += amount;
  res.json({ message: `Deposited $${amount} successfully.`, newBalance: account.balance });
});

// Withdraw money
app.post("/withdraw", verifyToken, (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid withdrawal amount." });
  }

  if (amount > account.balance) {
    return res.status(400).json({ message: "Insufficient balance." });
  }

  account.balance -= amount;
  res.json({ message: `Withdrew $${amount} successfully.`, newBalance: account.balance });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
