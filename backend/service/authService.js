import adminModel from "../model/admin.js";
import tokenHelper from "../utils/tokenHelper.js";

const authService = (() => {
  const login = (username, password) => {
    return new Promise(async (resolve, reject) => {
      console.log(username, password);
      await adminModel.find().then((result) => {
        console.log(result);
      });
      const user = await adminModel.findOne({
        username: username.toLowerCase(),
      });
      console.log(user);
      if (!user) {
        reject("User not Found.");
      } else {
        if (user.password === password) {
          const token = tokenHelper.createToken(user.id, user.role);
          resolve({ token });
        } else reject("Incorrect password.");
      }
    });
  };

  return {
    login: login,
  };
})();

export default authService;
