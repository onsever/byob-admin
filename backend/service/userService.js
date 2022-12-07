import User from "../model/user.js";
import Table from "../model/table.js";
import Order from "../model/order.js";

const constantService = (() => {
  const getUserById = (id) => {
    return new Promise(async (resolve, reject) => {
      User.findById(id, { password: 0 }).then((result) => {
        console.log(result);
        delete result.password;
        resolve(result);
      });
    });
  };

  const getUserTableDetail = (id) => {
    return new Promise(async (resolve, reject) => {
      const table = await Table.findOne({
        createdAt: {
          $gte: today.toDate(),
          $lte: moment(today).endOf("day").toDate(),
        },
        userId: id,
      }).exec();

      const order = await Order.findById(table.orderId);

      resolve({
        tableNo: table.tableNo,
        order: order.order,
      });
    });
  };

  return {
    getUserById: getUserById,
    getUserTableDetail: getUserTableDetail,
  };
})();

export default constantService;
