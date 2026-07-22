const Image = require("../models/Image");

const getResult = async (req, res) => {

    try {

        const image = await Image.findOne({
            processingId: req.params.id
        });

        if (!image) {
            return res.status(404).json({
                success: false,
                message: "Image not found"
            });
        }

        res.json({
            success: true,
            processingId: image.processingId,
            status: image.status,
            analysis: image.analysis
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = { getResult };