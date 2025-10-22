import mongoose from "mongoose";

/**
 * Asynchronously connects to the MongoDB database.
 * ------------------------------------------------
 * Uses Mongoose's `connect()` method, which returns a Promise.
 * If the connection is successful, it logs a success message.
 * If it fails, the process exits with a non-zero exit code.
 *
 * @async
 * @function connectDB
 * @returns {Promise<void>} Resolves when the connection is successful.
 * @throws {Error} If the connection to MongoDB fails.
 */
const connectDB = async () => {
  try {
    // Attempt to connect using the connection string from environment variables
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);

    // Exit the process with failure code (1 means "unsuccessful")
    process.exit(1);
  }
};

// Export the function so it can be imported in server.js or index.js
export default connectDB;
