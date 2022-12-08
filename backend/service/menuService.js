import Food from "../model/food.js";

const menuService = (() => {
  const getFoodList = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const foodList = await Food.find();
        resolve(foodList);
      } catch (e) {
        reject(e);
      }
    });
  };

  const saveFoodList = (params) => {
    return new Promise(async (resolve, reject) => {
      try {
        const foodList = await Food.insertMany(params);
        resolve(foodList);
      } catch (e) {
        reject(e);
      }
    });
  };

  const saveFood = (params) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newFood = Food(params);
        await newFood.save();
        resolve(newFood);
      } catch (e) {
        reject(e);
      }
    });
  };

  return {
    getFoodList: getFoodList,
    saveFoodList: saveFoodList,
    saveFood: saveFood,
  };
})();

export default menuService;
