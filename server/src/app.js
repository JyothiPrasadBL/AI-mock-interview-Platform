// ============================================
// app.js - Express Application Setup
// ============================================

import express from "express";
import cors from "cors";

// Import routes
import routes from "./routes/index.js";

// Import error handlers
import {
  errorHandler,
  notFoundHandler,
} from "./middleware/error.middleware.js";

// Create Express app
const app = express();

// ============================================
// CORS CONFIGURATION
// ============================================

const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-mock-interview-platform-blond.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow Postman, Render health checks, browser direct access
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked Origin:", origin);
      return callback(new Error("CORS Not Allowed"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ============================================
// MIDDLEWARE
// ============================================

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ============================================
// TEST ROUTES
// ============================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running successfully 🚀",
  });
});

app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is working 🚀",
  });
});

// ============================================
// API ROUTES
// ============================================

app.use("/api", routes);

// ============================================
// 404 HANDLER
// ============================================

app.use(notFoundHandler);

// ============================================
// GLOBAL ERROR HANDLER
// ============================================

app.use(errorHandler);

// ============================================
// EXPORT
// ============================================

export default app;