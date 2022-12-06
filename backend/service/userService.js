import userModel from "../model/user.js";

const constantService = (() => {
  const getUserById = (id) => {
    return new Promise(async (resolve, reject) => {
      userModel.findById(id, { password: 0 }).then((result) => {
        console.log(result);
        delete result.password;
        resolve(result);
      });
    });
  };

  return {
    getUserById: getUserById,
  };
})();

export default constantService;
