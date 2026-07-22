const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  processingId: {
    type: String,
    required: true,
    unique: true,
  },

  imageName: {
    type: String,
    required: true,
  },

  imagePath: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "processing", "completed", "failed"],
    default: "pending",
  },

  uploadedAt: {
    type: Date,
    default: Date.now,
  },

  analysis: {
    type: Object,
    default: {},
  },

  failureReason: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Image", imageSchema);