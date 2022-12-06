import express from "express";
import authController from "./controller/authController.js";
import constantController from "./controller/constantController.js";

const route = express.Router();

route.use("/constant", constantController);
route.use("/auth", authController);

export default route;
