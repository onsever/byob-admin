import Order from "../model/order.js";
import Table from "../model/table.js";
import Drink from "../model/drink.js";
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
          const newOrder = Order({
            ...params,
            isComplete: false,
            drinkOrder: [],
          });
          await newOrder.save();

          await Table.findByIdAndUpdate(table.id, { orderId: newOrder.id });

          resolve(newOrder);
        }
      } catch (e) {
        console.log("error", e);
      }
    });
  };

  const createDrinkOrder = (params, user) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!params.drinkId) {
          reject("Drink is empty.");
          return;
        }
        const drink = await Drink.findById(params.drinkId);
        if (!drink) {
          reject("Drink not found.");
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

        // check here
        const acceptBid = checkBid(
          +params.price,
          +drink.guranteedPrice,
          +params.quantity
        );
        if (acceptBid) {
          if (table.orderId) {
            const order = await Order.findById(table.orderId);
            order.drinkOrder = [...order.drinkOrder, params];
            await order.save();
            resolve("Order Updated");
          } else {
            const newOrder = Order({
              order: [],
              isComplete: false,
              drinkOrder: [params],
            });
            await newOrder.save();

            await Table.findByIdAndUpdate(table.id, { orderId: newOrder.id });

            resolve(newOrder);
          }
        } else {
          reject("Bidding price too low.");
        }
        resolve({ table, acceptBid });
      } catch (e) {
        console.log("error", e);
      }
    });
  };

  const checkBid = (bidPrice, guaranteedPrice, quantity) => {
    if (!bidPrice || !guaranteedPrice || !quantity) {
      return false;
    }

    if (quantity < 2) return bidPrice >= guaranteedPrice;
    else if (quantity >= 2 && quantity < 5)
      return bidPrice >= guaranteedPrice - 0.1 * guaranteedPrice;
    else if (quantity >= 5 && quantity < 8)
      return bidPrice >= guaranteedPrice - 0.15 * guaranteedPrice;
    else if (quantity >= 8)
      return bidPrice >= guaranteedPrice - 0.2 * guaranteedPrice;
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
    createDrinkOrder: createDrinkOrder,
  };
})();

export default orderService;
