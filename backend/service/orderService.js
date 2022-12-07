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
          checkedOut: false,
        }).exec();
        if (!table) {
          reject("User doesn't have any table selected.");
          return;
        }

        if (table.orderId) {
          await Order.findByIdAndUpdate(table.orderId, {
            order: { ...params, isComplete: false },
          });
          resolve("Order Updated");
        } else {
          const newOrder = Order({ ...params, isComplete: false });
          await newOrder.save();

          await Table.findByIdAndUpdate(table.id, { orderId: newOrder.id });

          resolve(newOrder);
        }
      } catch (e) {
        console.log("error", e);
      }
    });
  };

  const completeOrder = (orderId, params) => {
    return new Promise(async (resolve, reject) => {
      try {
        const order = await Order.findById(orderId).exec();
        if (!order) {
          reject("Order not found.");
          return;
        }

        await Order.findByIdAndUpdate(orderId, {
          isComplete: true,
          totalPaid: params.totalPaid,
        });

        await Table.findOneAndUpdate(
          { orderId: orderId },
          { checkedOut: true }
        );

        resolve("Order has been completed.");
      } catch (e) {
        console.log("error", e);
      }
    });
  };

  return {
    createOrder: createOrder,
    completeOrder: completeOrder,
  };
})();

export default orderService;
