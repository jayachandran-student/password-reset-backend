import express from "express";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/user-dashboard", verifyToken, (req, res) => {
  res.json({ message: "Welcome user", role: req.user.role });
});

router.get("/admin-dashboard", verifyToken, isAdmin, (req, res) => {
  res.json({ message: "Welcome admin", role: req.user.role });
});

export default router;
