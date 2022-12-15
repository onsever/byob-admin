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
        } else reject("List must be an array.");
      } catch (e) {
        reject(e);
      }
    });
  };

  const saveFood = (params) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (params._id) {
          await Food.findByIdAndUpdate(params._id, { $set: params });
          resolve("Food Updated Successfully");
        } else {
          const newFood = new Food(params);
          await newFood.save();
          resolve("Food Added Successfully");
        }
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
        } else reject("List must be an array.");
      } catch (e) {
        reject(e);
      }
    });
  };

  const saveCategory = (params) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (params._id) {
          await Category.findByIdAndUpdate(params._id, { $set: params });
          resolve("Category Updated Successfully");
        } else {
          const newCat = Category(params);
          await newCat.save();
          resolve("Category Added Successfully");
        }
      } catch (e) {
        reject(e);
      }
    });
  };

  const deleteCategory = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (id) {
          await Category.findByIdAndDelete(id);
          resolve("Category Deleted.");
        } else {
          reject("Category not found.");
        }
      } catch (e) {
        reject(e);
      }
    });
  };

  const getDrinkList = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const categories = await Category.find().exec();
        const drinks = await Drink.find(
          {},
          {
            title: 1,
            price: 1,
            guranteedPrice: 1,
            currentPrice: 1,
            category: 1,
            image: 1,
            isHighest: 1,
          }
        ).exec();

        let result = categories.map((cat) => {
          return {
            title: cat.name,
            data: drinks
              .filter((x) => x.category === cat.id)
              .map((drink) => {
                drink = drink.toJSON();
                if (!drink.isHighest || !drink.currentPrice) {
                  drink.currentPrice = drink.price;
                }
                drink.isHighest = drink.isHighest || false;
                drink.displayGuaranteedPrice = (
                  drink.isHighest
                    ? +drink.currentPrice + +drink.currentPrice * 0.5
                    : +drink.price + +drink.price * 0.5
                ).toFixed(2);
                return drink;
              }),
          };
        });

        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  };

  const getAllDrink = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const drinks = await Drink.find(
          {},
          {
            title: 1,
            price: 1,
            guranteedPrice: 1,
            currentPrice: 1,
            category: 1,
            image: 1,
            isHighest: 1,
          }
        ).exec();

        resolve(
          drinks.map((drink) => {
            return {
              ...drink,
              displayGuaranteedPrice: drink.isHighest
                ? +drink.currentPrice + +drink.currentPrice * 0.5
                : +drink.price + +drink.price * 0.5,
            };
          })
        );
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
        } else reject("List must be an array.");
      } catch (e) {
        reject(e);
      }
    });
  };

  const saveDrink = (params) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (params._id) {
          await Drink.findByIdAndUpdate(params._id, {
            $set: params,
          }).catch((err) => {
            console.log("Error in update drink", err);
            reject("Drink update failed.");
          });
          resolve("Drink Updated Successfully");
        } else {
          const newDrink = new Drink(params);
          await newDrink.save();
          resolve("Drink Added Successfully");
        }
      } catch (e) {
        reject(e);
      }
    });
  };

  const deleteDrink = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (id) {
          await Drink.findByIdAndDelete(id);
          resolve("Drink Deleted.");
        } else {
          reject("Drink not found.");
        }
      } catch (e) {
        reject(e);
      }
    });
  };

  const deleteFood = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (id) {
          await Food.findByIdAndDelete(id);
          resolve("Food Deleted.");
        } else {
          reject("Food not found.");
        }
      } catch (e) {
        reject(e);
      }
    });
  };

  const resetDrinkPrices = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await Drink.updateMany(
          {},
          { $set: { isHighest: false, currentPrice: "" } }
        );
        resolve("All drinks reset to it's original state");
      } catch (e) {
        reject("Error in reset drink prices service");
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
    saveDrink: saveDrink,
    getAllDrink: getAllDrink,
    deleteDrink: deleteDrink,
    deleteFood: deleteFood,
    deleteCategory: deleteCategory,
    resetDrinkPrices: resetDrinkPrices,
  };
})();

export default menuService;
