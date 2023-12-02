const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  place_id: {
    type: String,
    // required: true,
  },
  label: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  etiquete: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
