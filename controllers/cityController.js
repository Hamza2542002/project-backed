const asyncHandler = require("express-async-handler");
const City = require("../models/cityModel");

// * @desc Get [all] cities for a user
// * GET /api/users/:id/cities
const getUserCities = asyncHandler(async (req, res) => {
  const user = req.user;
  res.status(200).json(user.cities);
});

// * @desc Add a city to a user
// * POST /api/users/:id/cities
const addCityToUser = asyncHandler(async (req, res) => {
  const user = req.user;
  const existingCity = user.cities.find(
    (city) => city.cityName === req.body.cityName
  );
  if (existingCity) {
    res.status(400);
    throw new Error("City with this name already exists for this user");
  }
  const city = new City(req.body);
  user.cities.push(city);
  await user.save();
  res.status(201).json(city);
});

// * @desc Get a specific city for a user
// * GET /api/users/:id/cities/:cityName
const getUserCity = asyncHandler(async (req, res) => {
  const city = req.city;
  res.status(200).json(city);
});

// * @desc Update a city for a user
// * PUT /api/users/:id/cities/:cityName
const updateUserCity = asyncHandler(async (req, res) => {
  const user = req.user;
  const city = req.city;

  city.cityName = req.body.cityName || city.cityName;
  city.country = req.body.country || city.country;
  city.emoji = req.body.emoji || city.emoji;
  city.date = req.body.date || city.date;
  city.notes = req.body.notes || city.notes;
  city.id = req.body.id || city.id;
  if (req.body.position) {
    if (req.body.position.hasOwnProperty("lat")) {
      city.position.lat = req.body.position.lat;
    }
    if (req.body.position.hasOwnProperty("lng")) {
      city.position.lng = req.body.position.lng;
    }
  }

  await user.save();
  res.status(200).json(city);
});

// * @desc Delete a city for a user
// * DELETE /api/users/:id/cities/:cityName
const deleteUserCity = asyncHandler(async (req, res) => {
  const user = req.user;
  user.cities = user.cities.filter(
    (city) => city.cityName !== req.params.cityName
  );

  await user.save();
  res.status(200).json({ message: "City has been removed successfully" });
});

module.exports = {
  getUserCities,
  getUserCity,
  addCityToUser,
  updateUserCity,
  deleteUserCity,
};
