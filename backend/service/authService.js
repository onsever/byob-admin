const authService = (() => {

  const login = (username, password) => {
    return new Promise(async (resolve, reject) => {
      resolve({ message: "Success", username, password })
    })
  }

  return {
    login: login,
  }

})();

export default authService;