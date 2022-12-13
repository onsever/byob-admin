import express from "express";
import tableService from "../service/tableService.js";
import httpHelper from "../utils/httpHelper.js";
import auth from "../middleware/authMiddleware.js";

const route = express.Router();

route.post("/", auth, (req, res) => {
  try {
    tableService
      .createTable(req.body, req.user)
      .then((result) => {
        httpHelper.success(res, result);
      })
      .catch((err) => httpHelper.error(res, err, "Table Reservation Error"));
  } catch (e) {
    httpHelper.error(res, e);
  }
});

route.get("/all", auth, (req, res) => {
  try {
    tableService
      .getTableDetailsByUserId(req.user._id)
      .then((result) => {
        httpHelper.success(res, result);
      })
      .catch((err) => httpHelper.error(res, err));
  } catch (e) {
    httpHelper.error(res, e);
  }
});

route.get("/:number", auth, (req, res) => {
  try {
    tableService
      .getTableDetails(req.params.number)
      .then((result) => {
        httpHelper.success(res, result);
      })
      .catch((err) => httpHelper.error(res, err));
  } catch (e) {
    httpHelper.error(res, e);
  }
});

export default route;
