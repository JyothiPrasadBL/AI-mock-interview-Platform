// ============================================
// app.js - Express Application Setup
// ============================================

import express from "express";
import cors from "cors";

// Routes
import routes from "./routes/index.js";

// Error handlers
import {
  errorHandler,
  notFoundHandler,
} from "./middleware/error.middleware.js";

const app = express();

// ============================================
// CORS
// ============================================

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow Postman, Render health checks
      if (!origin) {
        return callback(null, true);
      }

      // Local frontend
      if (origin === "http://localhost:5173") {
        return callback(null, true);
      }

      // Allow every Vercel deployment
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      console.log("Blocked Origin:", origin);
      callback(new Error("CORS Not Allowed"));
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

// ============================================
// Middleware
// ============================================

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ============================================
// Health Check
// ============================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend running successfully 🚀",
  });
});

app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is working 🚀",
  });
});

// ============================================
// API Routes
// ============================================

app.use("/api", routes);

// ============================================
// 404
// ============================================

app.use(notFoundHandler);

// ============================================
// Error Handler
// ============================================

app.use(errorHandler);

// ============================================
// Export
// ============================================

export default app;