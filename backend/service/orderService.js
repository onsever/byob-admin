import moment from "moment";

import Order from "../model/order.js";
import Table from "../model/table.js";
import Drink from "../model/drink.js";
import Category from "../model/category.js";

const today = moment().startOf("day");

const orderService = (() => {
  const createOrder = (params, user) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!params.order || !params.order.length) {
          reject("Order is empty.");
          return;
        }
        const table = await Table.findOne({
          createdAt: {
            $gte: today.toDate(),
            $lte: moment(today).endOf("day").toDate(),
          },
          userId: user._id,
          checkedOut: false,
        }).exec();
        if (!table) {
          reject("User doesn't have any table selected.");
          return;
        }

        if (table.orderId) {
          await Order.findByIdAndUpdate(table.orderId, {
            order: params.order,
            isComplete: false,
          });
          resolve("Order Updated");
        } else {
          const newOrder = Order({
            order: params.order,
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
        const table = await Table.findOne({
          createdAt: {
            $gte: today.toDate(),
            $lte: moment(today).endOf("day").toDate(),
          },
          userId: user._id,
          checkedOut: false,
        }).exec();
        if (!table) {
          reject("User doesn't have any table selected.");
          return;
        }

        // check here
        const acceptBid = checkBid(
          +params.price,
          drink.isHighest ? +drink.currentPrice : +drink.guranteedPrice,
          +params.quantity
        );
        if (acceptBid) {
          if (table.orderId) {
            const order = await Order.findById(table.orderId);
            order.drinkOrder = [...order.drinkOrder, params];
            await order.save();
            await checkAndChangePrice(drink.category);

            resolve("Order Updated");
          } else {
            const newOrder = Order({
              order: [],
              isComplete: false,
              drinkOrder: [params],
            });
            await newOrder.save();
            await checkAndChangePrice(drink.category);

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

  const checkAndChangePrice = () => {
    return new Promise(async (resolve, reject) => {
      console.log("today.toDate()", today.toDate());
      console.log("moment(today).endOf", moment(today).endOf("day").toDate());
      // getting All order from today
      const orders = await Order.find(
        {
          createdAt: {
            $gte: today.toDate(),
            $lte: moment(today).endOf("day").toDate(),
          },
        },
        { drinkOrder: 1, _id: 0 }
      ).exec();
      console.log("order", orders.length);
      const drinkList = await Drink.find();
      // const categories = await Category.find();

      let drinksCount = [];
      orders.forEach((order) => {
        order.drinkOrder.forEach((drink) => {
          if (!drinksCount.length)
            drinksCount.push({
              id: drink.drinkId,
              count: +drink.quantity,
              category: drinkList.find((x) => x.id === drink.drinkId).category,
            });
          else {
            const d = drinksCount.find((x) => x.id === drink.drinkId);
            if (d) d.count += +drink.quantity;
            else
              drinksCount.push({
                id: drink.drinkId,
                count: +drink.quantity,
                category: drinkList.find((x) => x.id === drink.drinkId)
                  .category,
              });
          }
        });
      });

      // this gives an object with categories as keys
      const groups = drinksCount.reduce((groups, drink) => {
        const cat = drink.category;
        if (!groups[cat]) {
          groups[cat] = [];
        }
        groups[cat].push(drink);
        return groups;
      }, {});

      // Edit: to add it in the array format instead
      const groupArrays = Object.keys(groups).map((category) => {
        return {
          category,
          drinks: groups[category].sort((a, b) => b.count - a.count),
        };
      });

      // Getting highest ordered and updating values
      const update = groupArrays.map(async (category) => {
        const highestOrdered = category.drinks[0].id;
        const drinkDetail = await Drink.findById(highestOrdered);
        if (!drinkDetail.toJSON().isHighest) {
          await Drink.updateMany(
            { isHighest: true },
            { $set: { isHighest: false } }
          );
          drinkDetail.isHighest = true;
          drinkDetail.currentPrice = (
            +drinkDetail.price +
            0.2 * +drinkDetail.price
          ).toFixed(2);
          drinkDetail.displayGuaranteedPrice = (
            drinkDetail.isHighest
              ? +drinkDetail.currentPrice + +drinkDetail.currentPrice * 0.5
              : +drinkDetail.price + +drinkDetail.price * 0.5
          ).toFixed(2);
          // drinkDetail.guranteedPrice = (
          //   +drinkDetail.price +
          //   0.5 * +drinkDetail.price
          // ).toFixed(2);
          await drinkDetail.save();
        }
      });

      await Promise.all([update]);

      resolve("Prices Updated");
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
          paymentMethod: params.paymentMethod,
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
    checkAndChangePrice,
  };
})();

export default orderService;
