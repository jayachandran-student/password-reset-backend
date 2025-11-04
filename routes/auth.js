// routes/auth.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// ------------------
// Auth (Signup / Login)
// ------------------
// Register a new user
// POST /api/auth/signup
router.post("/signup", authController.signup);

// Login user, returns JWT token
// POST /api/auth/login
router.post("/login", authController.login);

// ------------------
// Password reset flow (controller handles token generation, email, and reset)
// ------------------
// Request a password reset email (controller will send email with token)
// POST /api/auth/request-reset
router.post("/request-reset", authController.requestPasswordReset);

// Reset password with token (token is passed in URL)
// POST /api/auth/reset/:token
router.post("/reset/:token", authController.resetPassword);

// Export router
module.exports = router;
