// Core modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Controllers
const loginController = require("./controllers/login");
const registerController = require("./controllers/register");

const constants = require("./constants");

// Init
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

mongoose.connect(`mongodb://127.0.0.1/${constants.DB_NAME}`).then(() => {
  console.log(`Connected to database ${constants.DB_NAME}.`);
  app.listen(constants.PORT, () => {
    console.log(`Server listening on port ${constants.PORT}.`);
  });
});

// Login
app.post("/login", loginController);

// Register
app.post("/register", registerController);
