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

const app = express();

// ============================================
// CORS
// ============================================

const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-mock-interview-platform-blond.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, browser direct access)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS Not Allowed"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options("*", cors());

// Parse JSON
app.use(express.json({ limit: "10mb" }));

// ============================================
// TEST ROUTES
// ============================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running",
  });
});

app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "API is working",
  });
});

// ============================================
// MAIN ROUTES
// ============================================

app.use("/api", routes);

// ============================================
// ERROR HANDLERS
// ============================================

app.use(notFoundHandler);

app.use(errorHandler);

export default app;