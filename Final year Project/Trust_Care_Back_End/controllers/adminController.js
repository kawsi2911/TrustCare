import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// ── Verify Token (middleware) ────────────────────────────────────────────────
export const verifyAdminToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "trustcare_secret_key");
    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

// ── Admin Login ──────────────────────────────────────────────────────────────
export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Please provide username and password" });
    }
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid username or password" });
    }
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid username or password" });
    }
    admin.lastLogin = new Date();
    await admin.save();
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET || "trustcare_secret_key",
      { expiresIn: "1d" }
    );
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        lastLogin: admin.lastLogin,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

// ── Create Admin ─────────────────────────────────────────────────────────────
export const createAdmin = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: "Admin already exists" });
    }
    const admin = new Admin({ username, password, email });
    await admin.save();
    res.status(201).json({ success: true, message: "Admin created successfully" });
  } catch (error) {
    console.error("Create admin error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

// ── Get All Users ─────────────────────────────────────────────────────────────
export const getAllUsers = async (req, res) => {
  try {
    const { type, search } = req.query;
    let filter = {};
    if (type === "Families") filter.userType = "Family";
    if (type === "Verified") filter.status = "Verified";
    if (type === "Pending")  filter.status = "Pending";
    if (search) {
      filter.$or = [
        { name:  { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { nic:   { $regex: search, $options: "i" } },
      ];
    }
    const users = await User.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: users.length, users });
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

// ── Get Single User ───────────────────────────────────────────────────────────
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

// ── Update User Status ────────────────────────────────────────────────────────
export const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: `User status updated to ${status}`, user });
  } catch (error) {
    console.error("Update user status error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

// ── Get Dashboard Stats ───────────────────────────────────────────────────────
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers      = await User.countDocuments();
    const totalProviders  = await User.countDocuments({ userType: "ServiceProvider" });
    const totalFamilies   = await User.countDocuments({ userType: "Family" });
    const activeServices  = await User.countDocuments({ status: "Active" });
    const pendingUsers    = await User.countDocuments({ status: "Pending" });

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalProviders,
        totalFamilies,
        activeServices,
        pendingUsers,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};