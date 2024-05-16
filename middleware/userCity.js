const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const getUserByID = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  req.user = user;
  next();
});

const getCityForUser = asyncHandler(async (req, res, next) => {
  const user = req.user; // ! req.user is set in getUserByID
  const city = user.cities.find(
    (city) => city.cityName === req.params.cityName
  );
  if (!city) {
    res.status(404);
    throw new Error("City not found");
  }

  req.city = city;
  next();
});

module.exports = { getUserByID, getCityForUser };
