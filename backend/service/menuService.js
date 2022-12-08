import Food from "../model/food.js";
import Category from "../model/category.js";
import Drink from "../model/drink.js";

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
        if (Array.isArray(params)) {
          const foodList = await Food.insertMany(params);
          resolve(foodList);
        } else reject("List must be an array.")
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

  const getCategoryList = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const catList = await Category.find();
        resolve(catList);
      } catch (e) {
        reject(e);
      }
    });
  };

  const saveCategoryList = (params) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (Array.isArray(params)) {
          const catList = await Category.insertMany(params);
          resolve(catList);
        } else reject("List must be an array.")
      } catch (e) {
        reject(e);
      }
    });
  };

  const saveCategory = (params) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newCat = Category(params);
        await newCat.save();
        resolve(newCat);
      } catch (e) {
        reject(e);
      }
    });
  };

  const getDrinkList = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const drinkList = await Drink.find();
        resolve(drinkList);
      } catch (e) {
        reject(e);
      }
    });
  };

  const saveDrinkList = (params) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (Array.isArray(params)) {
          const drinkList = await Drink.insertMany(params);
          resolve(drinkList);
        } else reject("List must be an array.")

      } catch (e) {
        reject(e);
      }
    });
  };

  const saveDrink = (params) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newDrink = Drink(params);
        await newDrink.save();
        resolve(newDrink);
      } catch (e) {
        reject(e);
      }
    });
  };

  return {
    getFoodList: getFoodList,
    saveFoodList: saveFoodList,
    saveFood: saveFood,
    getCategoryList: getCategoryList,
    saveCategory: saveCategory,
    saveCategoryList: saveCategoryList,
    getDrinkList: getDrinkList,
    saveDrinkList: saveDrinkList,
    saveDrink: saveDrink
  };
})();

export default menuService;
