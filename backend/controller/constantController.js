import express from "express";
import constantService from "../service/constantService.js";
import httpHelper from "../utils/httpHelper.js";

const route = express.Router();

route.get("/", (req, res) => {
  try {
    constantService
      .getAll()
      .then((result) => {
        httpHelper.success(res, result);
      })
      .catch((err) => httpHelper.error(res, err));
  } catch (e) {
    httpHelper.error(res, e);
  }
});

export default route;
