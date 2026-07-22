const Image = require("../models/Image");

const getFailure = async (req, res) => {

    const image = await Image.findOne({
        processingId: req.params.id
    });

    if (!image) {

        return res.status(404).json({
            message: "Image not found"
        });

    }

    res.json({
        processingId: image.processingId,
        status: image.status,
        failureReason: image.failureReason
    });

};

module.exports = { getFailure };