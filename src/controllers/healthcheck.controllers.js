import { ApiResponse } from "../utils/api-response.js";

/**
 * Health check controller.
 *
 * Responds with a 200 OK status if the server is running.
 *
 * @async
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 * @param {import("express").NextFunction} next - Call to pass control to the next middleware.
 *   If an error is passed, Express skips normal middleware and goes to the error handler.
 * @returns {Promise<void>} Sends JSON response to the client
 */
const healthCheck = async (req, res, next) => {
  try {
    const user = await getUserFromDB(); // Example DB check
    res
      .status(200)
      .json(new ApiResponse(200, { message: "Server is running" }));
  } catch (error) {
    next(error); // Pass error to Express error-handling middleware
  }
};

export { healthCheck };
