/**
 * ApiResponse
 *
 * This class is a standard wrapper for API responses.
 * It ensures consistency by including status code, payload,
 * a human-readable message, and a success flag.
 *
 * Usage example:
 *  const res = new ApiResponse(200, { user: "Alice" }, "User fetched successfully");
 *  console.log(res);
 *  // {
 *  //   statusCode: 200,
 *  //   data: { user: "Alice" },
 *  //   message: "User fetched successfully",
 *  //   success: true
 *  // }
 */
class ApiResponse {
  /**
   * Creates an ApiResponse object
   *
   * @param {number} statusCode - HTTP status code (e.g., 200, 404, 500)
   * @param {any} data - The payload of the response (object, array, etc.)
   * @param {string} [message="Successful"] - Optional human-readable message
   */
  constructor(statusCode, data, message = "Successful") {
    /**
     * HTTP status code of the response
     * @type {number}
     */
    this.statusCode = statusCode;

    /**
     * Payload data returned by the API
     * @type {any}
     */
    this.data = data;

    /**
     * Human-readable message about the response
     * Defaults to "Successful"
     * @type {string}
     */
    this.message = message;

    /**
     * Boolean flag indicating if the response is successful
     * True if statusCode < 400, false otherwise
     * @type {boolean}
     */
    this.success = statusCode < 400;
  }
}

// Export the class for use in other modules
export { ApiResponse };
