const Task = require("../models/Task");
const User = require("../models/User");

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, priority, status, assignedTo } = req.body;
  const user = req.user; // User details from JWT

  try {
    // Only admins can create tasks
    if (user.role !== "admin") {
      return res.status(403).json({ msg: "Admin access required" });
    }

    // Verify assigned user exists
    if (assignedTo) {
      const assignedUser = await User.findById(assignedTo);
      if (!assignedUser) {
        return res.status(400).json({ msg: "Assigned user does not exist" });
      }
    }

    const task = new Task({
      title,
      description,
      priority,
      status,
      assignedTo,
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  const user = req.user; // User details from JWT

  try {
    // Destructure query parameters for filtering
    const { priority, status, assignedTo } = req.query;

    // Build the query object
    let query = user.role === "admin" ? {} : { assignedTo: user.id };

    if (priority) query.priority = priority;
    if (status) query.status = status;
    if (assignedTo && user.role === "admin") {
      query.assignedTo = assignedTo;
    }

    // Fetch tasks based on the query
    const tasks = await Task.find(query).populate("assignedTo", "name email");

    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
  const user = req.user; // User details from JWT

  try {
    const task = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email"
    );

    if (!task) return res.status(404).json({ msg: "Task not found" });

    // Check if the user is allowed to see the task
    if (user.role !== "admin" && task.assignedTo.toString() !== user.id) {
      return res.status(403).json({ msg: "Access denied" });
    }

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const { title, description, priority, status, assignedTo } = req.body;
  const user = req.user; // User details from JWT

  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    // Only admins can update tasks
    if (user.role !== "admin") {
      return res.status(403).json({ msg: "Admin access required" });
    }

    // Update fields
    if (title) task.title = title;
    if (description) task.description = description;
    if (priority) task.priority = priority;
    if (status) task.status = status;
    if (assignedTo) {
      const assignedUser = await User.findById(assignedTo);
      if (!assignedUser) {
        return res.status(400).json({ msg: "Assigned user does not exist" });
      }
      task.assignedTo = assignedTo;
    }

    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const user = req.user; // User details from JWT

  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Only admins can delete tasks
    if (user.role !== "admin") {
      return res.status(403).json({ msg: "Admin access required" });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
