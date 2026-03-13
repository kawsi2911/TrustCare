import express from "express";
import {
  adminLogin,
  createAdmin,
  verifyAdminToken,
  getAllUsers,
  getUserById,
  updateUserStatus,
  deleteUser,
  getDashboardStats,
} from "../controllers/adminController.js";

const router = express.Router();

// ── Auth Routes ──────────────────────────────────────────────────────────────
router.post("/login", adminLogin);
router.post("/create", createAdmin);
router.get("/verify", verifyAdminToken, (req, res) => {
  res.json({ success: true, message: "Token is valid", admin: req.admin });
});

// ── Stats Route (protected) ──────────────────────────────────────────────────
router.get("/stats", verifyAdminToken, getDashboardStats);

// ── User Routes (protected) ──────────────────────────────────────────────────
router.get("/users", verifyAdminToken, getAllUsers);
router.get("/users/:id", verifyAdminToken, getUserById);
router.put("/users/:id/status", verifyAdminToken, updateUserStatus);
router.delete("/users/:id", verifyAdminToken, deleteUser);

export default router;