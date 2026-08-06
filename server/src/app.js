// ============================================
// app.js - Express Application Setup
// ============================================

import express from "express";
import cors from "cors";

// Import all routes
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

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-mock-interview-platform-blond.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle JSON requests
app.use(express.json({ limit: "10mb" }));

// API Routes
app.use("/api", routes);

// 404 Handler
app.use(notFoundHandler);

// Global Error Handler
app.use(errorHandler);

// Export app
export default app;