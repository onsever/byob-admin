import Table from "../model/table.js";
import Order from "../model/order.js";
import User from "../model/user.js";
import moment from "moment";

const tableService = (() => {
  const createTable = (params, user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const todaysTableList = Table({
          ...params,
          userId: user.id,
          orderId: null,
          checkedOut: false,
        });
        todaysTableList.save();
        resolve({ params, user });
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
        const user = await User.findById(table.userId);

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
