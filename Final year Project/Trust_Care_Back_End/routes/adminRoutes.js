import express from "express";
import {
  adminLogin,
  createAdmin,
  verifyAdminToken,
} from "../controllers/adminController.js";

const router = express.Router();

// POST /api/admin/login - Admin login
router.post("/login", adminLogin);

// POST /api/admin/create - Create first admin (use once then disable)
router.post("/create", createAdmin);

// GET /api/admin/verify - Verify token (protected route example)
router.get("/verify", verifyAdminToken, (req, res) => {
  res.json({
    success: true,
    message: "Token is valid",
    admin: req.admin,
  });
});

export default router;