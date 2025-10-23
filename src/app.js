/**
 * @file app.js
 * @description Main Express application setup.
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
 * Middleware: Parse incoming JSON request bodies
 * @middleware
 * @description
 * - Populates req.body with parsed JSON
 * - Limits request size to 16kb to prevent large payloads
 */
app.use(express.json({ limit: "16kb" }));

/**
 * Middleware: Parse URL-encoded request bodies (HTML forms)
 * @middleware
 * @param {boolean} extended - Allows nested objects if true
 * @description
 * - Populates req.body with parsed form data
 * - Limits request size to 16kb
 */
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

/**
 * Middleware: Serve static files from "public" folder
 * @middleware
 * @description
 * - Example: /index.html, /logo.png
 * - Responds immediately if the request matches a file
 */
app.use(express.static("public"));

// -------------------------- CORS CONFIGURATION --------------------------

/**
 * Middleware: Configure CORS (Cross-Origin Resource Sharing)
 * @middleware
 * @description
 * - Allows frontend apps from other origins to make requests
 * - Handles preflight OPTIONS requests automatically
 */
app.use(
  cors({
    /** @type {string|string[]} Allowed origins (comma-separated in .env) */
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",

    /** @type {boolean} Allow credentials (cookies, auth tokens) in cross-origin requests */
    credentials: true,

    /** @type {string[]} Allowed HTTP methods from frontend */
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    /** @type {string[]} Allowed custom headers from frontend */
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// -------------------------- ROUTES --------------------------

import { healthCheckRouter } from "./routes/healthcheck.routes.js";

/**
 * Route: /api/v1/healthcheck
 * @description Health check endpoints
 */
app.use("/api/v1/healthcheck", healthCheckRouter);

/**
 * GET /
 * @route GET /
 * @description Root route that responds with a welcome message
 * @returns {string} Welcome message
 */
app.get("/", (req, res) => {
  res.send("Welcome to basecampy");
});

// -------------------------- EXPORT --------------------------

/**
 * Export the Express app instance
 * @module app
 * @description Can be imported in server.js or other entry files
 */
export default app;
