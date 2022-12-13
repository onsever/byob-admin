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
          tableNo: params.tableNo,
        }).exec();
        if (todaysTable) {
          reject("Table has already been reserved.");
        } else {
          const table = Table({
            ...params,
            userId: user._id,
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

  const getAllTableReservation = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const today = moment().startOf("day");
        const table = await Table.find(
          {
            createdAt: {
              $gte: today.toDate(),
              $lte: moment(today).endOf("day").toDate(),
            },
            checkedOut: false,
          },
          { checkedOut: 1, tableNo: 1, _id: 0 }
        ).exec();

        resolve(table);
      } catch (e) {
        reject("Error while getting table info.");
      }
    });
  };

  return {
    createTable: createTable,
    getTableDetails: getTableDetails,
    getAllTableReservation: getAllTableReservation,
  };
})();

export default tableService;
