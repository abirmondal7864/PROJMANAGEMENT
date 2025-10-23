import { Router } from "express";
import { healthCheck } from "../controllers/healthcheck.controllers.js";

/**
 * @fileoverview Defines the routes for health check endpoints.
 * @module routes/healthcheck
 */

const router = Router();

/**
 * GET /
 * @name HealthCheck
 * @description Endpoint to check if the server is running. Returns a simple status message.
 * @route {GET} /
 * @returns {Object} 200 - Success message
 * @example
 * // Example response
 * {
 *   "status": "OK",
 *   "message": "Server is running"
 * }
 */

router.route("/").get(healthCheck);

export default router;
