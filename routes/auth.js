const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const User = require("../models/User");

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Forgot Password (send reset link)
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.error("ForgotPassword Error: User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // Generate token
    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();

    // Build reset link
    if (!process.env.FRONTEND_URL) {
      console.error("ForgotPassword Error: FRONTEND_URL not set");
      return res.status(500).json({ message: "Server misconfiguration" });
    }
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    // Send email
    try {
      await transporter.sendMail({
        to: user.email,
        from: process.env.EMAIL_USER,
        subject: "Password Reset Request",
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
      });
    } catch (mailErr) {
      console.error("Nodemailer Error:", mailErr.message);
      return res.status(500).json({ message: "Failed to send email", error: mailErr.message });
    }

    res.json({ message: "Reset link sent to email" });
  } catch (err) {
    console.error("ForgotPassword API Error:", err.message);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});

// Reset Password
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      console.error("ResetPassword Error: Invalid or expired token");
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("ResetPassword API Error:", err.message);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});

module.exports = router;
