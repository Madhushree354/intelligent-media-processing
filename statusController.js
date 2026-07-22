const Image = require("../models/Image");

const getStatus = async (req, res) => {

    const image = await Image.findOne({
        processingId: req.params.id,
    });

    if (!image) {
        return res.status(404).json({
            message: "Image Not Found",
        });
    }

    res.json({
        processingId: image.processingId,
        status: image.status,
    });

};

module.exports = {
    getStatus,
};