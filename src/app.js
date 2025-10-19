/**
 * app.js
 *
 * Main Express application setup
 * - Middlewares: JSON/body parsing, URL-encoded forms, static files
 * - CORS configuration for cross-origin requests
 * - Routes definition
 */

import express from "express"; // Import Express framework
import cors from "cors"; // Import CORS middleware

// Initialize Express application
const app = express();

// -------------------------- MIDDLEWARES --------------------------

/**
 * Parse incoming JSON request bodies
 * - Populates req.body with parsed JSON
 * - Limit request size to 16kb to prevent large payloads
 */
app.use(express.json({ limit: "16kb" }));

/**
 * Parse URL-encoded request bodies (HTML forms)
 * - Populates req.body with parsed form data
 * - extended: true allows nested objects
 * - Limit request size to 16kb
 */
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

/**
 * Serve static files from the "public" folder
 * - Example: /index.html, /logo.png
 * - If request matches a file, it responds immediately
 */
app.use(express.static("public"));

// -------------------------- CORS CONFIGURATION --------------------------

/**
 * Configure CORS (Cross-Origin Resource Sharing)
 * - Allows frontend apps from other origins to make requests
 * - Handles preflight OPTIONS requests automatically
 */
app.use(
  cors({
    // Allowed origins
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",

    // Allow credentials (cookies, auth tokens) in cross-origin requests
    credentials: true,

    // Allowed HTTP methods from frontend
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    // Allowed custom headers from frontend
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// -------------------------- ROUTES --------------------------

/**
 * GET /
 * Root route
 * - Responds with a welcome message
 */
app.get("/", (req, res) => {
  res.send("Welcome to basecampy");
});

// -------------------------- EXPORT --------------------------

/**
 * Export the Express app instance
 * - Can be imported in server.js or other entry files
 */
export default app;
