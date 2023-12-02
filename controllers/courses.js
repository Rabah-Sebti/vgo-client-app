const express = require("express");
const {
  CustomAPIError,
  BadRequest,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");
const { StatusCodes } = require("http-status-codes");
// const Job = require("../models/job");
const Route = require("../models/course");
const Driver = require("../models/driver");

const createCourse = async (req, res) => {
  try {
    // req.body.createdBy = req.user.userID;
    // const {
    //   body: { JOB_LIB, JOB_CODE, JOB_START_DATE },
    // } = req;
    // if (JOB_LIB === "" || JOB_CODE === "" || JOB_START_DATE === "") {
    //   throw new BadRequest(
    //     "label or code or start date fields cannot be empty"
    //   );
    // }
    console.log("course", req.body);
    req.body.createdBy = req.user.userID;
    const course = await Route.create(req.body);
    const driver = await Driver.findOne({ carType: "Sedan" });
    res.status(StatusCodes.CREATED).json({ driver, course });
  } catch (error) {
    console.log("createJob", error);
  }
};
const getAllCourses = async (req, res) => {
  try {
    const courses = await Route.find({ createdBy: req.user.userID }).sort(
      "createdAt"
    );
    res.status(StatusCodes.OK).json({ courses });
  } catch (error) {
    console.log("getAllJobs", error);
  }
};
const updateCourse = async (req, res) => {
  try {
    const {
      // body: { JOB_LIB, JOB_CODE, JOB_START_DATE, JOB_END_DATE },
      user: { userID },
      params: { id: courseId },
    } = req;
    const course = await Route.findOneAndUpdate(
      { _id: courseId, createdBy: userID },
      { etat: false },
      { new: true, runValidators: true }
    );
    if (!course) {
      throw new NotFoundError(`No course with id ${courseId}`);
    }
    res.status(StatusCodes.OK).json({ course });
  } catch (error) {
    console.log("updateJob", error);
  }
};
// const deleteCourse = async (req, res) => {
//   const {
//     user: { userID },
//     params: { id: jobId },
//   } = req;
//   try {
//     const job = await Job.findOneAndDelete({
//       JOB_ID: jobId,
//       createdBy: userID,
//     });
//     if (!job) {
//       throw new NotFoundError(`No job with id ${jobId}`);
//     }
//     res.status(StatusCodes.OK).json({ job });
//   } catch (error) {
//     console.log("deleteJob", error);
//   }
// };
// const getCourse = async (req, res) => {
  // try {
  //   const {
  //     user: { userID },
  //     params: { id: jobId },
  //   } = req;

  //   const job = await Job.findOne({
  //     JOB_ID: jobId,
  //     createdBy: userID,
  //   });
  //   if (!job) {
  //     throw new NotFoundError(`No job with id ${userID} `);
  //   }
  //   res.status(StatusCodes.OK).json({ job });
  // } catch (error) {
  //   console.log("getJob", error);
  // }
// };
module.exports = {
  createCourse,
  getAllCourses,
  updateCourse,
  // deleteCourse,
  // getCourse,
};
