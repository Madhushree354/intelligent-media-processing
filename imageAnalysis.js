

/*const { Jimp } = require("jimp");
const Tesseract = require("tesseract.js");

async function analyzeImage(imagePath) {

    // Force an error (for testing only)
    throw new Error("Image processing failed");

    // The code below will not execute until you remove the line above.

    const image = await Jimp.read(imagePath);

    image.greyscale();

    const width = image.bitmap.width;
    const height = image.bitmap.height;

    let totalBrightness = 0;
    let edgeDifference = 0;
    let pixelCount = 0;

    image.scan(0, 0, width, height, function (x, y, idx) {

        const gray = this.bitmap.data[idx];

        totalBrightness += gray;

        if (x < width - 1) {

            const nextGray = this.bitmap.data[idx + 4];

            edgeDifference += Math.abs(gray - nextGray);

            pixelCount++;
        }
    });

    const averageBrightness = totalBrightness / (width * height);

    let brightness = "Normal";

    if (averageBrightness < 70) {
        brightness = "Too Dark";
    } else if (averageBrightness > 180) {
        brightness = "Too Bright";
    }

    const blurScore = pixelCount > 0 ? edgeDifference / pixelCount : 0;

    const blur = blurScore < 12;

    const {
        data: { text },
    } = await Tesseract.recognize(imagePath, "eng");

    const extractedText = text.trim();

    const cleanedText = extractedText
        .replace(/\s+/g, "")
        .toUpperCase();

    const regex = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;

    const validNumberPlate = regex.test(cleanedText);

    return {
        blur,
        blurScore,
        brightness,
        averageBrightness,
        extractedText: cleanedText,
        validNumberPlate,
    };
}

module.exports = analyzeImage;*/

/*
const { Jimp } = require("jimp");
const Tesseract = require("tesseract.js");

async function analyzeImage(imagePath) {
    console.log("Inside analyzeImage");
    throw new Error("Image processing failed");
}

module.exports = analyzeImage;*/

const { Jimp } = require("jimp");
const Tesseract = require("tesseract.js");

async function analyzeImage(imagePath) {
  try {
    // Read image
    const image = await Jimp.read(imagePath);

    // Convert image to grayscale
    image.greyscale();

    const width = image.bitmap.width;
    const height = image.bitmap.height;

    let totalBrightness = 0;
    let edgeDifference = 0;
    let pixelCount = 0;

    // Analyze pixels
    image.scan(0, 0, width, height, function (x, y, idx) {
      const gray = this.bitmap.data[idx];

      totalBrightness += gray;

      if (x < width - 1) {
        const nextGray = this.bitmap.data[idx + 4];
        edgeDifference += Math.abs(gray - nextGray);
        pixelCount++;
      }
    });

    // Brightness Detection
    const averageBrightness = totalBrightness / (width * height);

    let brightness = "Normal";

    if (averageBrightness < 70) {
      brightness = "Too Dark";
    } else if (averageBrightness > 180) {
      brightness = "Too Bright";
    }

    // Blur Detection
    const blurScore =
      pixelCount > 0 ? edgeDifference / pixelCount : 0;

    const blur = blurScore < 12;

    // OCR using Tesseract
    const {
      data: { text },
    } = await Tesseract.recognize(imagePath, "eng");

    const extractedText = text.trim();

    // Clean extracted text
    const cleanedText = extractedText
      .replace(/\s+/g, "")
      .toUpperCase();

    // Indian Vehicle Number Plate Regex
    const regex = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;

    const validNumberPlate = regex.test(cleanedText);

    // If OCR found no text
    if (!cleanedText) {
      return {
        blur,
        blurScore,
        brightness,
        averageBrightness,
        extractedText: "",
        validNumberPlate: false,
      };
    }

    // Return analysis result
    return {
      blur,
      blurScore,
      brightness,
      averageBrightness,
      extractedText: cleanedText,
      validNumberPlate,
    };

  } catch (error) {
    console.error("Image Analysis Error:", error);

    throw new Error("Image processing failed");
  }
}

module.exports = analyzeImage;