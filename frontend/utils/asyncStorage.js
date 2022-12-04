import AsyncStorage from "@react-native-async-storage/async-storage";

//Private General Functions
const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(`@${key}`, jsonValue);
    return true;
  } catch (e) {
    // saving error
    console.log("Error on store data", e);
  }
};

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`@${key}`);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log("Error on get data", e);
  }
};

const deleteData = async (key) => {
  try {
    await AsyncStorage.removeItem(`@${key}`);
  } catch (e) {
    // error reading value
    console.log("Error on get data", e);
  }
};
//Private General Functions END

export { storeData, getData, deleteData };
