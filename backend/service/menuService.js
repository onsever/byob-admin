import Food from "../model/food.js";
import Category from "../model/category.js";

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
        const catList = await Category.insertMany(params);
        resolve(catList);
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

  return {
    getFoodList: getFoodList,
    saveFoodList: saveFoodList,
    saveFood: saveFood,
    getCategoryList: getCategoryList,
    saveCategory: saveCategory,
    saveCategoryList: saveCategoryList
  };
})();

export default menuService;
