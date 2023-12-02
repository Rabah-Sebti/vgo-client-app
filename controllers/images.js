const File = require("../models/file");
const {
  CustomAPIError,
  BadRequest,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");
const { StatusCodes } = require("http-status-codes");
const createImage = async (req, res) => {
  try {
    // const { originalname, buffer, mimetype } = req.file;
    const userId = req.user.userID;
    const userImage = await File.findOne(
      {
        // JOB_ID: jobId,
        createdBy: userId,
      }
      // fileId
    );
    if (!userImage) {
      console.log("create");
      const newFile = new File({
        data: req.body.myImage,
        createdBy: userId,
      });
      const image = await File.create(newFile);
      await image.save();

      res.status(201).json({ message: "File uploaded successfully!", image });
    } else {
      console.log("update");
      const image = await File.findOneAndUpdate(
        { createdBy: userId },
        { data: req.body.myImage },
        { new: true, runValidators: true }
      );
      res
        .status(201)
        .json({ message: "File uploaded successfully!", image });
    }

    // const course = await Route.create(req.body);
    // const driver = await Driver.findOne({ carType: "Sedan" });
    // res.status(StatusCodes.CREATED).json({ driver, course });
  } catch (error) {
    console.log("createJob", error);
  }
};
const getImage = async (req, res) => {
  // console.log(req);
  try {
    const {
      user: { userID },
      // params: { id: fileId },
    } = req;

    const image = await File.findOne(
      {
        // JOB_ID: jobId,
        createdBy: userID,
      }
      // fileId
    );
    console.log("userID", userID);
    if (!image) {
      throw new NotFoundError(`No image with id ${userID} `);
    }
    // res.setHeader("Content-Type", image.contentType);
    // res.send(image.data);
    res.status(StatusCodes.OK).json({ image });
  } catch (error) {
    console.log("getImage", error);
  }
};
module.exports = { createImage, getImage };
