import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

/**
 * User Schema
 * Represents a user in the system, handles authentication and tokens.
 */
const userSchema = new Schema({
  /**
   * User avatar (can be URL or local path)
   */
  avatar: {
    type: {
      url: String,
      localPath: "",
    },
    default: {
      url: `https://placehold.co/200x200`,
      localPath: "",
    },
  },

  /**
   * Username: unique, lowercase, trimmed
   */
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },

  /**
   * Email: unique identifier, lowercase, trimmed
   */
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  /**
   * Optional full name
   */
  fullName: {
    type: String,
    trim: true,
  },

  /**
   * Hashed password
   */
  password: {
    type: String,
    required: [true, "Password is required!"],
  },

  /**
   * Email verification status
   */
  isEmailVerified: {
    type: Boolean,
    default: false,
  },

  /**
   * Refresh token for re-authentication
   */
  refreshToken: {
    type: String,
  },

  /**
   * Temporary tokens for forgot password and email verification
   */
  forgotPasswordToken: {
    type: String,
  },
  emailVerificationToken: {
    type: String,
  },
  emailVerificationExpiry: {
    type: Date,
  },
});

/**
 * Pre-save hook
 * Hash password if modified before saving
 */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/**
 * Compare a plain password with the hashed password
 * @param {string} password - Plain password
 * @returns {Promise<boolean>} True if correct
 */
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

/**
 * Generate a short-lived JWT access token
 * @returns {string} JWT access token
 */
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
  );
};

/**
 * Generate a long-lived JWT refresh token
 * @returns {string} JWT refresh token
 */
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

/**
 * Generate a temporary token for password reset or email verification
 * @returns {Object} Object containing:
 *  - unHashedToken: token to send to user
 *  - hashedToken: hashed token to store in DB
 *  - tokenExpiry: expiration timestamp in ms
 */
userSchema.methods.generateTemporaryToken = function () {
  const unHashedToken = crypto.randomBytes(20).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");
  const tokenExpiry = Date.now() + 20 * 60 * 1000; // 20 minutes

  return { hashedToken, unHashedToken, tokenExpiry };
};

// Export User model
export const User = mongoose.model("User", userSchema);
