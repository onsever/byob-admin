import Table from "../model/table.js";
import Order from "../model/order.js";
import User from "../model/user.js";
import Constant from "../model/constant.js";
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

  const getTableDetailsByUserId = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const table = await Table.find({
          userId: id,
        }).exec();

        let orders = [];

        const order = table.map(async (t, i) => {
          const o = await Order.findById(t.orderId);
          orders.push(o);
          return table;
        });

        await Promise.all(order);

        resolve(orders);
      } catch (e) {
        console.log("error", e);
        reject("Error while getting table info.");
      }
    });
  };

  const getAllTableReservation = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const today = moment().startOf("day");
        const tableNumber = await Constant.findOne({
          key: "noOfTables",
        }).exec();
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
        let tables = [];
        for (let i = 0; i < +tableNumber.value; i++) {
          const t = {
            tableNo: i + 1,
            isReserved: false,
          };
          if (table.some((x) => +x.tableNo === i + 1)) {
            t.isReserved = true;
          }
          tables.push(t);
        }

        resolve(tables);
      } catch (e) {
        reject("Error while getting table info.");
      }
    });
  };

  const getTablesByUserId = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const tables = await Table.find({
          userId: id,
        }).exec();

        let orders = [];

        const order = tables.map(async (t, i) => {
          const o = await Order.findById(t.orderId);
          orders.push(o);
          return tables;
        });

        await Promise.all(order);
        resolve(orders);
      } catch (e) {
        console.log("error", e);
      }
    });
  };

  return {
    createTable: createTable,
    getTableDetails: getTableDetails,
    getTableDetailsByUserId: getTableDetailsByUserId,
    getTablesByUserId: getTablesByUserId,
    getAllTableReservation: getAllTableReservation,
  };
})();

export default tableService;
