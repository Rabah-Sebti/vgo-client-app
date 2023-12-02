const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  carName: {
    type: String,
    required: true,
  },
  carType: {
    type: String,
    required: true,
  },
  carYear: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Driver", driverSchema);
