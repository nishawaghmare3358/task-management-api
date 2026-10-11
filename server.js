
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Check required configuration
if (
  !process.env.JWT_SECRET ||
  process.env.JWT_SECRET.length < 32 ||
  process.env.JWT_SECRET.startsWith("change_this")
) {
  throw new Error(
    "Please set a strong JWT_SECRET in your .env file"
  );
}

// Middleware
app.use(cors());
app.use(express.json({ limit: "10kb" }));

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Task Management API is running"
  });
});

// API routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));

// Handle invalid JSON
app.use((err, req, res, next) => {
  if (
    err instanceof SyntaxError &&
    err.status === 400 &&
    "body" in err
  ) {
    return res.status(400).json({
      message: "Invalid JSON request body"
    });
  }

  return res.status(err.status || 500).json({
    message: "Request failed"
  });
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

const PORT = process.env.PORT || 3000;

// Connect database and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });