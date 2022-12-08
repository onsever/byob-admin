import jwt from "jsonwebtoken";

const tokenHelper = (() => {
  const createToken = (user, isAdmin) => {
    const token = jwt.sign({ user, isAdmin }, process.env.TOKEN_KEY, {
      // expiresIn: "24h",
    });
    return token;
  };

  return {
    createToken: createToken,
  };
})();

export default tokenHelper;
