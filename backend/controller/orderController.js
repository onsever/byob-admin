import express from "express";
import orderService from "../service/orderService.js";
import httpHelper from "../utils/httpHelper.js";
import auth from "../middleware/authMiddleware.js";

const route = express.Router();

route.post("/", auth, (req, res) => {
  try {
    orderService
      .createOrder(req.body)
      .then((result) => {
        httpHelper.success(res, result);
      })
      .catch((err) => httpHelper.error(res, err));
  } catch (e) {
    httpHelper.error(res, e);
  }
});

export default route;
