const { Worker } = require("bullmq");
const connection = require("../config/redis");

const Image = require("../models/Image");
const analyzeImage = require("../services/imageAnalysis");

console.log("Worker Started");

const worker = new Worker(
  "image-processing",
  async (job) => {
    console.log("Processing Job:", job.id);

    try {
      const image = await Image.findById(job.data.imageId);

      if (!image) {
        console.log("Image not found");
        return;
      }

      // Update status
      image.status = "processing";
      await image.save();

      // Analyze image
      const result = await analyzeImage(image.imagePath);

      // Save analysis
      image.analysis = result;
      image.status = "completed";
      image.failureReason = "";

      await image.save();

      console.log("Completed:", image.processingId);

    } catch (error) {
      console.log("Worker Error:", error.message);

      const image = await Image.findById(job.data.imageId);

      if (image) {
        image.status = "failed";
        image.failureReason = error.message;
        await image.save();
      }

      throw error;
    }
  },
  {
    connection,
  }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed successfully.`);
});

worker.on("failed", (job, err) => {
  console.log(`Job ${job.id} failed.`);
  console.log(err.message);
});

module.exports = worker;