import express from "express";
import authController from "./controller/authController.js";
import constantController from "./controller/constantController.js";
import userController from "./controller/userController.js";
import orderController from "./controller/orderController.js";
import tableController from "./controller/tableController.js";
import menuController from "./controller/menuController.js";

const route = express.Router();

route.use("/constant", constantController);
route.use("/auth", authController);
route.use("/user", userController);
route.use("/order", orderController);
route.use("/table", tableController);
route.use("/menu", menuController);

export default route;
