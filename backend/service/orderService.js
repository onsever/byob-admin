import Order from "../model/order.js";
import Table from "../model/table.js";
import moment from "moment";

const orderService = (() => {
  const createOrder = (params, user) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!params.order || !params.order.length) {
          reject("Order is empty.");
          return;
        }
        const today = moment().startOf("day");
        const table = await Table.findOne({
          createdAt: {
            $gte: today.toDate(),
            $lte: moment(today).endOf("day").toDate(),
          },
          userId: user.id,
        }).exec();
        if (!table) {
          reject("User doesn't have any table selected.");
          return;
        }

        const newOrder = Order(params);
        await newOrder.save();

        await Table.findByIdAndUpdate(table.id, { orderId: newOrder.id });

        resolve(newOrder);
      } catch (e) {
        console.log("error", e);
      }
    });
  };

  return {
    createOrder: createOrder,
  };
})();

export default orderService;
