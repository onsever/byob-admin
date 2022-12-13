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

route.delete("/food/:id", auth, (req, res) => {
  try {
    menuService
      .deleteFood(req.params.id)
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

route.delete("/category/:id", auth, (req, res) => {
  try {
    menuService
      .deleteCategory(req.params.id)
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

route.get("/drink", auth, (req, res) => {
  try {
    menuService
      .getDrinkList()
      .then((result) => {
        httpHelper.success(res, result);
      })
      .catch((err) => httpHelper.error(res, err));
  } catch (e) {
    httpHelper.error(res, e);
  }
});

route.get("/drink/all", auth, (req, res) => {
  try {
    menuService
      .getAllDrink()
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
    menuService
      .saveDrink(req.body)
      .then((result) => {
        httpHelper.success(res, result);
      })
      .catch((err) => httpHelper.error(res, err));
  } catch (e) {
    httpHelper.error(res, e);
  }
});

route.delete("/drink/:id", auth, (req, res) => {
  try {
    menuService
      .deleteDrink(req.params.id)
      .then((result) => {
        httpHelper.success(res, result);
      })
      .catch((err) => httpHelper.error(res, err));
  } catch (e) {
    httpHelper.error(res, e);
  }
});

route.post("/drink/list", auth, (req, res) => {
  try {
    menuService
      .saveDrinkList(req.body)
      .then((result) => {
        httpHelper.success(res, result);
      })
      .catch((err) => httpHelper.error(res, err));
  } catch (e) {
    httpHelper.error(res, e);
  }
});

export default route;
