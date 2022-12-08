import express from "express";
import menuService from "../service/menuService.js";
import httpHelper from "../utils/httpHelper.js";
import auth from "../middleware/authMiddleware.js";

const route = express.Router();

route.get("/food", auth, (req, res) => {
  try {
    menuService
      .getFoodList()
      .then((result) => {
        httpHelper.success(res, result);
      })
      .catch((err) => httpHelper.error(res, err));
  } catch (e) {
    httpHelper.error(res, e);
  }
});

route.post("/food", auth, (req, res) => {
  try {
    menuService
      .saveFood(req.body)
      .then((result) => {
        httpHelper.success(res, result);
      })
      .catch((err) => httpHelper.error(res, err));
  } catch (e) {
    httpHelper.error(res, e);
  }
});

route.post("/food/list", auth, (req, res) => {
  try {
    menuService
      .saveFoodList(req.body)
      .then((result) => {
        httpHelper.success(res, result);
      })
      .catch((err) => httpHelper.error(res, err));
  } catch (e) {
    httpHelper.error(res, e);
  }
});

route.get("/category", auth, (req, res) => {
  try {
    menuService
      .getCategoryList()
      .then((result) => {
        httpHelper.success(res, result);
      })
      .catch((err) => httpHelper.error(res, err));
  } catch (e) {
    httpHelper.error(res, e);
  }
});

route.post("/category", auth, (req, res) => {
  try {
    menuService
      .saveCategory(req.body)
      .then((result) => {
        httpHelper.success(res, result);
      })
      .catch((err) => httpHelper.error(res, err));
  } catch (e) {
    httpHelper.error(res, e);
  }
});

route.post("/category/list", auth, (req, res) => {
  try {
    menuService
      .saveCategoryList(req.body)
      .then((result) => {
        httpHelper.success(res, result);
      })
      .catch((err) => httpHelper.error(res, err));
  } catch (e) {
    httpHelper.error(res, e);
  }
});

export default route;
