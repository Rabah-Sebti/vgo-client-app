const User = require("../models/user");
const getCountryIso3 = require("country-iso-2-to-3");
const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const {
  CustomAPIError,
  BadRequest,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");
const Adress = require("../models/adress");
const Card = require("../models/card");
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    console.log("error on getUsers", error);
  }
};
const getUsersGeo = async (req, res) => {
  try {
    const users = await User.find();
    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) acc[countryISO3] = 0;
      acc[countryISO3]++;
      return acc;
    }, {});
    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );
    res.json(formattedLocations);
  } catch (error) {
    console.log("error on getUsers", error);
  }
};

const myAccount = async (req, res) => {
  debugger;
  // console.log(req.user);
  const id = req.user.userID;
  console.log(id);
  if (!id) {
    throw new BadRequest("Please provide email and password");
  }
  // const user = await User.findOne({ id });
  const user = await User.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(id),
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

  if (!user) {
    throw new UnauthenticatedError("invalid inputs");
  }
  // const isPassCorrect = await user.comparePassword(password);
  // if (!isPassCorrect) {
  //   throw new UnauthenticatedError("password incorect");
  // }
  // const token = user.createJWT();
  // console.log(user);
  res.json({ user: user[0] });
};

const createAdress = async (req, res) => {
  try {
    req.body.createdBy = req.user.userID;
    // const {
    //   body: { JOB_LIB, JOB_CODE, JOB_START_DATE },
    // } = req;
    // if (JOB_LIB === "" || JOB_CODE === "" || JOB_START_DATE === "") {
    //   throw new BadRequest(
    //     "label or code or start date fields cannot be empty"
    //   );
    // }
    const adress = await Adress.create(req.body);
    res.status(StatusCodes.CREATED).json({ adress });
  } catch (error) {
    console.log("createAdress", error);
  }
};
// get adresses
const getAdresses = async (req, res) => {
  try {
    const adresses = await Adress.find({ createdBy: req.user.userID }).sort(
      "createdAt"
    );
    res.status(StatusCodes.OK).json({ adresses });
  } catch (error) {
    console.log("getAdresses", error);
  }
};

const createPaymentCard = async (req, res) => {
  try {
    req.body.createdBy = req.user.userID;
    const {
      body: { cardNumber, country, cvc, endDate },
    } = req;
    if (cardNumber === "" || country === "" || cvc === "" || endDate === "") {
      throw new BadRequest(
        "label or code or start date fields cannot be empty"
      );
    }
    const paymentCard = await Card.create(req.body);
    res.status(StatusCodes.CREATED).json({ paymentCard });
  } catch (error) {
    // res.status(StatusCodes.BAD_REQUEST).json({ error:error });
    console.log("createPaymentCard", error);
  }
};
// getPaymentCards
const getPaymentCards = async (req, res) => {
  try {
    const paymentCards = await Card.find({ createdBy: req.user.userID }).sort(
      "createdAt"
    );
    res.status(StatusCodes.OK).json({ paymentCards });
  } catch (error) {
    console.log("getPaymentCards", error);
  }
};
// update user
const updateUser = async (req, res) => {
  try {
    const {
      user: { userID },
      // params: { id: salId },
    } = req;

    // const user = await User.findOneAndUpdate({ _id: userID }, req.body, {
    //   new: true,
    //   runValidators: true,

    // })
    const body = req.body;
    const user = await User.updateOne({ _id: userID }, [
      // {
      //   $match: { _id: mongoose.Types.ObjectId(userID) },
      // },
      {
        $set: { ...body, updatedAt: "$$NOW" }, // Set or update fields with the provided values
      },
      // {
      //   $project: ["password"], // Unset or remove specified fields
      // },
    ]);
    if (!user) {
      throw new NotFoundError(`No user with id ${userID}`);
    }

    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    console.log("updateSalarie", error);
  }
};

module.exports = {
  getUsers,
  getUsersGeo,
  myAccount,
  createAdress,
  getAdresses,
  createPaymentCard,
  getPaymentCards,
  updateUser,
};
