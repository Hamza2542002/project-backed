const express = require("express");
const router = express.Router({ mergeParams: true });
const { getUserByID, getCityForUser } = require("../middleware/userCity");

const {
  getUserCities,
  getUserCity,
  addCityToUser,
  updateUserCity,
  deleteUserCity,
} = require("../controllers/cityController");

router.route("/:id/cities").get(getUserByID, getUserCities);
router.route("/:id/cities").post(getUserByID, addCityToUser);

router
  .route("/:id/cities/:cityName")
  .get(getUserByID, getCityForUser, getUserCity);

router
  .route("/:id/cities/:cityName")
  .put(getUserByID, getCityForUser, updateUserCity);

router.route("/:id/cities/:cityName").delete(getUserByID, deleteUserCity);

module.exports = router;
