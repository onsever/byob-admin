import express from "express";
import orderService from "../service/orderService.js";
import httpHelper from "../utils/httpHelper.js";
import auth from "../middleware/authMiddleware.js";

const route = express.Router();

route.post("/", auth, (req, res) => {
  try {
    orderService
      .createOrder(req.body, req.user)
      .then((result) => {
        httpHelper.success(res, result);
      })
      .catch((err) => httpHelper.error(res, err));
  } catch (e) {
    httpHelper.error(res, e);
  }
});

route.post("/drink", auth, (req, res) => {
  try {
    orderService
      .createDrinkOrder(req.body, req.user)
      .then((result) => {
        httpHelper.success(res, result);
      })
      .catch((err) => httpHelper.error(res, err));
  } catch (e) {
    httpHelper.error(res, e);
  }
});

route.post("/complete/:id", auth, (req, res) => {
  try {
    orderService
      .completeOrder(req.params.id, req.body)
      .then((result) => {
        httpHelper.success(res, result);
      })
      .catch((err) => httpHelper.error(res, err));
  } catch (e) {
    httpHelper.error(res, e);
  }
});

export default route;
