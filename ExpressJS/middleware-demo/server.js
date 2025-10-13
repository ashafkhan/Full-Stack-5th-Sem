import express from "express";

const app = express();
const PORT = 5000;

const logger = (req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.url}`);
  next(); // move to the next middleware/route
};

// Apply logging middleware globally
app.use(logger);

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Missing Authorization header." });
  }

  const token = authHeader.split(" ")[1]; // Expect "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Malformed Authorization header." });
  }

  if (token !== "mysecrettoken") {
    return res.status(403).json({ message: "Invalid or expired token." });
  }

  // token valid → move to next
  next();
};


// Public route (no token needed)
app.get("/public", (req, res) => {
  res.json({ message: "This is a public route — no token needed." });
});

// Protected route (requires Bearer token)
app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Access granted to protected route!" });
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
