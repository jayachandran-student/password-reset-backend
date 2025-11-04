const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

router.get("/user-dashboard", verifyToken, (req, res) => {
  res.json({ message: "Welcome user", role: req.user.role, userId: req.user.id });
});

router.get("/admin-dashboard", verifyToken, isAdmin, (req, res) => {
  res.json({ message: "Welcome admin", role: req.user.role, userId: req.user.id });
});

module.exports = router;
