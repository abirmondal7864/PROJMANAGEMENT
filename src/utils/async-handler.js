// asyncHandler.js
// Utility to wrap async route handlers and forward errors automatically
// Avoids repeating try/catch in every async route

const asyncHandler = (requestHandler) => {
  // Higher-order function
  return (req, res, next) => {
    // Express middleware signature
    // Wrap the async function in a Promise and catch errors
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err)); // Forward any error to Express error handler
  };
};

export { asyncHandler }; // Named export for use in controllers
