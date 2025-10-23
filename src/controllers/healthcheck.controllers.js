import { ApiResponse } from "../utils/api-response.js";

/**
 * Health check controller.
 *
 * Responds with a 200 OK status and a JSON message indicating the server is running.
 *
 * @param {import("express").Request} req - The Express request object
 * @param {import("express").Response} res - The Express response object
 * @returns {void} Sends JSON response to the client
 */
const healthCheck = (req, res) => {
  try {
    res
      .status(200)
      .json(new ApiResponse(200, { message: "Server is running" }));
  } catch (error) {
    // Optionally handle errors here
    res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

export { healthCheck };
