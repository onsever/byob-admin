import adminModel from "../model/admin.js";

const authService = (() => {

  const login = (username, password) => {
    return new Promise(async (resolve, reject) => {
      const user = await adminModel.findOne({ username: username.toLowerCase() }).exec();
      if (!user) {
        reject("User not Found.")
      } else {
        if (user.password === password)
          resolve(user)
        else
          reject("Incorrect password.")

      }
    })
  }

  return {
    login: login,
  }

})();

export default authService;