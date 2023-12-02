const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  stop: {
    id: {
      type: String,
      required: true,
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
  },
});
const routeSchema = new mongoose.Schema(
  {
    depart: {
      place_id: {
        type: String,
        required: true,
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
    },
    destination: {
      place_id: {
        type: String,
        required: true,
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
    },
    stopItems: [
      {
        stop: {
          place_id: {
            type: String,
            required: true,
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
        },
      },
    ],
    service: {
      id: {
        type: String,
        required: true,
      },
      imgSrc: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      places: {
        type: String,
        required: true,
      },
      prix: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    etat: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Route", routeSchema);
