const express = require("express");
const connectDB = require("./config");
const authRoutes = require("./routes/auth"); // Import auth routes
const taskRoutes = require("./routes/tasks"); // Import task routes
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB
connectDB();
// Use authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
