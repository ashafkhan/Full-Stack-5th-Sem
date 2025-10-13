import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import transferRoutes from "./routes/transferRoutes.js";
import Account from "./models/Account.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use("/api", transferRoutes);

// Helper route to seed test data
app.get("/seed", async (req, res) => {
  await Account.deleteMany({});
  await Account.insertMany([
    { name: "Alice", balance: 1000 },
    { name: "Bob", balance: 500 },
  ]);
  res.json({ message: "Sample accounts created." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
