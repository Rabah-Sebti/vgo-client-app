const express = require("express");
const router = express.Router();
const {
  createCourse,
  deleteCourse,
  getAllCourses,
  updateCourse,
  getCourse,
} = require("../controllers/courses");
router.route("/").post(createCourse).get(getAllCourses);
router.route("/:id").put(updateCourse);
module.exports = router;
