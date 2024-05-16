const mongoose = require("mongoose");
const City = require("./cityModel");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please add user name"],
    },
    email: {
      type: String,
      unique: true, // ! unique email
      required: [true, "Please add user email"],
    },
    password: {
      type: String,
      required: [true, "Please add user password"],
    },
    cities: {
      type: [City.schema],
    },
    avatar: {
      type: String,
    },
    //! _id ==> unique id for each user
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
