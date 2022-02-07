import {Router} from 'express';
const UserController = require("./controller/UserController");

const auth = require("./middleware/auth");

const routes = new Router();

//User routes

routes.post("/user/register",UserController.create);
routes.post("/user/login", UserController.login);

export default routes;