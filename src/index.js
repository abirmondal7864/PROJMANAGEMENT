/**
 * Main server entry point
 * ------------------------
 * Loads environment variables, connects to MongoDB,
 * and starts the Express server only after a successful DB connection.
 */

import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";

/**
 * Load environment variables from the .env file
 * (e.g., MONGO_URI, PORT, etc.)
 */
dotenv.config({
  path: "./.env",
});

/**
 * Define the port on which the server will run.
 * If not specified in the .env file, default to 3000.
 */
const port = process.env.PORT || 3000;

/**
 * Connect to MongoDB first.
 * Once the connection is successful, start the server.
 * If the connection fails, log the error and exit the process.
 */
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Example app running on: http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // exit with failure code
  });
