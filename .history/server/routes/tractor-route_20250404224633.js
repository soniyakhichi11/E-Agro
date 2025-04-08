const express = require('express');
const router = express.Router();
const multer = require("multer");
const tractorController = require('../controllers/tractor-controller'); // Import controller functions
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Directory for storing images
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage: storage });

router.post("/addtractors",upload.single("image"), tractorController.addTractorForRent); // Add a tractor
router.get("/gettractors", tractorController.getAllTractors); // Get all tractors
router.post("/booktractors/book/:id", tractorController.bookTractor); // Book a tractor



module.exports = router;