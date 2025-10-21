/**
 * ApiError
 *
 * Custom error class for API responses.
 * Extends the built-in Error class to include additional properties
 * like HTTP status code, error details, and success flag.
 *
 * Usage example:
 *  throw new ApiError(404, "User not found", ["User ID missing"]);
 *
 *  // error object:
 *  // {
 *  //   statusCode: 404,
 *  //   message: "User not found",
 *  //   errors: ["User ID missing"],
 *  //   success: false,
 *  //   stack: "...stack trace..."
 *  // }
 */
class ApiError extends Error {
  /**
   * Creates an ApiError object
   *
   * @param {number} statusCode - HTTP status code (e.g., 400, 404, 500)
   * @param {string} [message="Something went wrong"] - Human-readable error message
   * @param {Array} [errors=[]] - Optional array of detailed errors (e.g., validation errors)
   * @param {string} [stack=""] - Optional custom stack trace
   */
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = "",
  ) {
    super(message); // Pass message to the built-in Error constructor

    /**
     * HTTP status code of the error
     * @type {number}
     */
    this.statusCode = statusCode;

    /**
     * Human-readable error message
     * @type {string}
     */
    this.message = message;

    /**
     * Always false for errors
     * @type {boolean}
     */
    this.success = false;

    /**
     * Optional array of detailed error messages
     * @type {Array}
     */
    this.errors = errors;

    /**
     * Stack trace of the error
     * If not provided, capture a clean stack trace
     * @type {string}
     */
    if (stack) {
      this.stack = stack;
    } else {
      // Skip constructor in stack trace for cleaner output
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Export the class for use in other modules
export { ApiError };
