import express from "express";
import authService from "../service/authService.js";
import httpHelper from "../utils/httpHelper.js";

const route = express.Router();

route.post("/login", (req, res) => {
  try {
    authService
      .login(req.body?.username || null, req.body?.password || null)
      .then((result) => {
        httpHelper.success(res, result);
      })
      .catch((err) => httpHelper.error(res, err));
  } catch (e) {
    httpHelper.error(res, e);
  }
});

export default route;
