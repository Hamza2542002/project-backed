const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    cityName: {
      type: String,
      required: [true, "City name is required"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    emoji: {
      type: String,
    },
    date: {
      type: Date,
    },
    notes: {
      type: String,
    },
    position: {
      lat: {
        type: Number,
        required: [true, "Latitude is required"],
      },
      lng: {
        type: Number,
        required: [true, "Longitude is required"],
      },
    },
    id: {
      type: String,
      required: [true, "ID is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("City", citySchema);
