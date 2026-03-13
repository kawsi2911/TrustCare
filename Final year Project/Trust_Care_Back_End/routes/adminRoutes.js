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
  getAllServices,
  getServiceById,
  updateServiceStatus,
  createService,
  deleteService,
  getServiceStats,
  generateReport,
} from "../controllers/adminController.js";

const router = express.Router();

// ── Auth Routes ──────────────────────────────────────────────────────────────
router.post("/login", adminLogin);
router.post("/create", createAdmin);
router.get("/verify", verifyAdminToken, (req, res) => {
  res.json({ success: true, message: "Token is valid", admin: req.admin });
});

// ── Stats Routes (protected) ─────────────────────────────────────────────────
router.get("/stats", verifyAdminToken, getDashboardStats);
router.get("/services/stats", verifyAdminToken, getServiceStats);

// ── User Routes (protected) ──────────────────────────────────────────────────
router.get("/users", verifyAdminToken, getAllUsers);
router.get("/users/:id", verifyAdminToken, getUserById);
router.put("/users/:id/status", verifyAdminToken, updateUserStatus);
router.delete("/users/:id", verifyAdminToken, deleteUser);

// ── Service Routes (protected) ───────────────────────────────────────────────
router.get("/services", verifyAdminToken, getAllServices);
router.get("/services/:id", verifyAdminToken, getServiceById);
router.post("/services", verifyAdminToken, createService);
router.put("/services/:id/status", verifyAdminToken, updateServiceStatus);
router.delete("/services/:id", verifyAdminToken, deleteService);

// ── Report Routes (protected) ────────────────────────────────────────────────
router.get("/reports", verifyAdminToken, generateReport);

export default router;