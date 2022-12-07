import Table from "../model/table.js";

const tableService = (() => {
  const createTable = (params, user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const todaysTableList = Table({
          ...params,
          userId: user.id,
          orderId: null,
        });
        todaysTableList.save();
        resolve({ params, user });
      } catch (e) {
        console.log("error", e);
      }
    });
  };

  return {
    createTable: createTable,
  };
})();

export default tableService;
