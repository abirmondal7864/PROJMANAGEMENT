// Import custom utility class for standardized API responses
import { ApiResponse } from "../utils/api-response.js";

// Import async handler utility to simplify async error handling
import { asyncHandler } from "../utils/async-handler.js";

/**
 * ✅ Preferred version (using asyncHandler)
 *
 * @desc    Health check endpoint to verify server status
 * @route   GET /
 * @access  Public
 *
 * - `asyncHandler` automatically wraps the async function in a try/catch.
 * - If an error occurs, it forwards it to Express's error middleware.
 * - Keeps code clean and avoids repeating try/catch in every route.
 */
const healthCheck = asyncHandler(async (req, res) => {
  res.status(200).json(
    new ApiResponse(200, { message: "Server is running" }), // Consistent API format
  );
});

/**
 * ⚠️ Older / Less preferred version (manual try-catch)
 *
 * This version works fine but becomes repetitive when you have many routes.
 * Developers prefer using `asyncHandler` (above) to reduce boilerplate code.
 */
/*
const healthCheck = async (req, res, next) => {
  try {
    // Example async operation (e.g., DB ping)
    // const dbCheck = await checkDatabaseConnection();

    res
      .status(200)
      .json(
        new ApiResponse(200, { message: "Server is running" })
      );
  } catch (error) {
    // Manually forward error to Express error middleware
    next(error);
  }
};
*/

// Export the preferred version
export { healthCheck };
