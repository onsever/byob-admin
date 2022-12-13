import moment from "moment";

import User from "../model/user.js";
import Table from "../model/table.js";
import Order from "../model/order.js";

const today = moment().startOf("day");

const constantService = (() => {
  const getUserById = (id) => {
    return new Promise(async (resolve, reject) => {
      User.findById(id, { password: 0 }).then((result) => {
        delete result.password;
        resolve(result);
      });
    });
  };

  const getUserTableDetail = (id) => {
    return new Promise(async (resolve, reject) => {
      console.log("today.toDate()", today.toDate());
      console.log("moment", moment(today).endOf("day").toDate());
      const table = await Table.findOne({
        createdAt: {
          $gte: today.toDate(),
          $lte: moment(today).endOf("day").toDate(),
        },
        userId: id,
        checkedOut: false,
      }).exec();

      if (table) {
        let result = {
          tableNo: table.tableNo,
          order: null,
        };
        if (table.orderId) result.order = await Order.findById(table.orderId);

        resolve(result);
      } else {
        reject("No table found for the user.");
      }
    });
  };

  const getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
      User.find().then((result) => {
        if (result) {
          resolve(result);
        } else {
          reject("No users found.");
        }
      });
    });
  };

  return {
    getUserById: getUserById,
    getUserTableDetail: getUserTableDetail,
    getAllUsers: getAllUsers,
  };
})();

export default constantService;
