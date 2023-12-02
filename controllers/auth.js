const User = require("../models/user");
const { UnauthenticatedError, BadRequest } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const register = async (req, res) => {
  const user = await User.create(req.body);
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { firstName: user.getName() }, accessToken: token });
};
const login = async (req, res) => {
  debugger;
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("invalid inputs");
  }
  const isPassCorrect = await user.comparePassword(password);
  if (!isPassCorrect) {
    throw new UnauthenticatedError("password incorect");
  }
  const newUser = await User.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(user._id),
      },
    },
    {
      $lookup: {
        from: "files", // Name of the User collection
        localField: "_id",
        foreignField: "createdBy",
        as: "user",
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{ $arrayElemAt: ["$user", 0] }, "$$ROOT"],
        },
      },
    },
    { $project: { user: 0 } },
    // {
    //   $unwind: "$user", // Unwind the array created by $lookup
    // },
    // {
    //   $project: {
    //     // _id: 1,
    //     // firstName: 1,
    //     // email: 1,
    //     image: { myImage: "$user.data" },
    //   },
    // },
  ]);
  const token = user.createJWT();
  res.json({ user: newUser[0], accessToken: token });
};
// my account

module.exports = { login, register };
