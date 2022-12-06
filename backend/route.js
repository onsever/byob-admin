import express from "express";
import authController from "./controller/authController.js";
import constantController from "./controller/constantController.js";
import userController from "./controller/userController.js";
import orderController from "./controller/orderController.js";

const route = express.Router();

route.use("/constant", constantController);
route.use("/auth", authController);
route.use("/user", userController);
route.use("/order", orderController);

export default route;
