import express from "express";
import userService from "../service/userService.js";
import httpHelper from "../utils/httpHelper.js";

const route = express.Router();

route.get("/table", (req, res) => {
  try {
    userService
      .getUserTableDetail(req.user.id)
      .then((result) => {
        httpHelper.success(res, result);
      })
      .catch((err) => httpHelper.error(res, err));
  } catch (e) {
    httpHelper.error(res, e);
  }
});

route.get("/:id", (req, res) => {
  try {
    userService
      .getUserById(req.params.id)
      .then((result) => {
        httpHelper.success(res, result);
      })
      .catch((err) => httpHelper.error(res, err));
  } catch (e) {
    httpHelper.error(res, e);
  }
});

export default route;
