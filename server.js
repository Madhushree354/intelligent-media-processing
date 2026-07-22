require("dotenv").config();

// Redis Connection
require("./src/config/redis");

// Start BullMQ Worker
require("./src/workers/imageWorker");

const express = require("express");
const morgan = require("morgan");
const connectDB = require("./src/config/db");
const imageRoutes = require("./src/routes/imageRoutes");
const statusRoutes = require("./src/routes/statusRoutes");
const resultRoutes = require("./src/routes/resultRoutes");
const failureRoutes = require("./src/routes/failureRoutes");



const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api", imageRoutes);

app.use("/api", statusRoutes);
app.use("/api", resultRoutes);
app.use("/api", failureRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});