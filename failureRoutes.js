const express = require("express");

const router = express.Router();

const {
    getFailure,
} = require("../controllers/failureController");

router.get("/failure/:id", getFailure);

module.exports = router;