const express = require("express");

const router = express.Router();

const {
    getResult,
} = require("../controllers/resultController");

router.get("/result/:id", getResult);

module.exports = router;