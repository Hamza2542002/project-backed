const express = require("express");
const connectToDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const serverless = require("serverless-http");

connectToDb();

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// app.use("/api/users", require("./routes/userRoutes")); before deploying to netlify
// app.use("/api/users", require("./routes/cityRoutes"));
// app.use(errorHandler);

app.use("/.netlify/functions/api/users", require("./routes/userRoutes"));
app.use("/.netlify/functions/api/users", require("./routes/cityRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

module.exports.handler = serverless(app);

//? User Routes
//! path to register         => /api/users/register
//! path to login            => /api/users/login
//! path to a User           => /api/users/:id

//? City Routes
//! path to all cities       => /api/users/:id/cities
//! path to a specific city  => /api/users/:id/cities/:cityName

//todo: add documentation
