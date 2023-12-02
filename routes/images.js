const express = require("express");
const multer = require("multer");

const router = express.Router();
const storage = multer.memoryStorage(); // Store the file in memory (you can change this to disk storage if needed)
const upload = multer({ storage: storage });

const { createImage, getImage } = require("../controllers/images");
router.post("/upload", upload.single("file"), createImage);
// .get(getAllJobs);
router.route("/").get(getImage)
// .put(updateJob).delete(deleteJob);
module.exports = router;
