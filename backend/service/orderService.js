import Order from "../model/order.js";

const orderService = (() => {
  const createOrder = (params) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!params.order || !params.order.length) {
          reject("Order is empty.");
          return;
        }
        const newOrder = Order(params);
        await newOrder.save();
        // code for saving id in table
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
