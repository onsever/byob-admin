import constantModel from "../model/constant.js";

const constantService = (() => {
  const getAll = () => {
    return new Promise(async (resolve, reject) => {
      const constants = await constantModel.find();
      resolve(constants);
    });
  };

  return {
    getAll: getAll,
  };
})();

export default constantService;
