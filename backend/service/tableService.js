import Table from "../model/table.js";
import Order from "../model/order.js";
import User from "../model/user.js";
import moment from "moment";

const tableService = (() => {
  const createTable = (params, user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const today = moment().startOf("day");
        const todaysTable = await Table.findOne({
          createdAt: {
            $gte: today.toDate(),
            $lte: moment(today).endOf("day").toDate(),
          },
          checkedOut: false,
        }).exec();
        if (todaysTable) {
          reject("Table has already been reserved.");
        } else {
          const table = Table({
            ...params,
            userId: user.id,
            orderId: null,
            checkedOut: false,
          });
          await table.save();
          resolve("Table has been reserved.");
        }
      } catch (e) {
        console.log("error", e);
      }
    });
  };

  const getTableDetails = (number) => {
    return new Promise(async (resolve, reject) => {
      try {
        const today = moment().startOf("day");
        const table = await Table.findOne({
          createdAt: {
            $gte: today.toDate(),
            $lte: moment(today).endOf("day").toDate(),
          },
          tableNo: number,
          checkedOut: false,
        }).exec();

        if (!table) {
          reject("Table not reserved yet.");
          return;
        }

        const order = await Order.findById(table.orderId);
        const user = await User.findById(table.userId, {
          firstName: 1,
          lastName: 1,
          phone: 1,
          email: 1,
          address: 1,
          dob: 1,
        });

        resolve({ order, user });
      } catch (e) {
        console.log("error", e);
      }
    });
  };

  return {
    createTable: createTable,
    getTableDetails: getTableDetails,
  };
})();

export default tableService;
