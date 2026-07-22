/*const { v4: uuidv4 } = require("uuid");
const Image = require("../models/Image");
  const imageQueue = require("../queue/imageQueue");

const uploadImage = async (req, res) => {
  try {
    const processingId = uuidv4();

    const image = new Image({
      processingId,
      imageName: req.file.originalname,
      imagePath: req.file.path,
    });

    await image.save();

    await imageQueue.add("analyze-image", {
  imageId: image._id,
});

    res.status(201).json({
      success: true,
      processingId,
      status: "pending",
      message: "Image uploaded successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadImage,
};*/


const { v4: uuidv4 } = require("uuid");
const Image = require("../models/Image");
const imageQueue = require("../queue/imageQueue");

const uploadImage = async (req, res) => {
  try {
    const processingId = uuidv4();

    const image = new Image({
      processingId,
      imageName: req.file.originalname,
      imagePath: req.file.path,
    });

    await image.save();

    await imageQueue.add("analyze-image", {
      imageId: image._id,
    });

    res.status(201).json({
      success: true,
      processingId,
      status: "pending",
      message: "Image uploaded successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = { uploadImage };