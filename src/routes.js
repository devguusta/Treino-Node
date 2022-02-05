const express = require("express");
const UserController = require("./controller/UserController");

const auth = require("./middleware/auth");

const routes = express.Router();

//User routes

routes.post("/user/register", UserController.create);
routes.post("/user/login");

module.exports = routes;