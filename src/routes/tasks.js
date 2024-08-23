const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/TaskController");
const { authMiddleware, adminMiddleware } = require("../middlewares/auth");

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Create task (admin only)
router.post("/", adminMiddleware, createTask);

// Get all tasks (available to all authenticated users)
router.get("/", getTasks);

// Get task by ID (available to all authenticated users)
router.get("/:id", getTaskById);

// Update task (admin only)
router.put("/:id", adminMiddleware, updateTask);

// Delete task (admin only)
router.delete("/:id", adminMiddleware, deleteTask);

module.exports = router;
