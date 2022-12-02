import adminModel from "../model/admin.js";
import tokenHelper from "../utils/tokenHelper.js";

const authService = (() => {

  const login = (username, password) => {
    return new Promise(async (resolve, reject) => {
      const user = await adminModel.findOne({ username: username.toLowerCase() }).exec();
      if (!user) {
        reject("User not Found.")
      } else {
        if (user.password === password) {
          const token = tokenHelper.createToken(user.id, user.role);
          resolve({ token })
        }
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