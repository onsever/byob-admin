import jwt from "jsonwebtoken";

const tokenHelper = (() => {

  const createToken = (id, email, role) => {
    const token = jwt.sign(
      { id, email, role },
      process.env.TOKEN_KEY,
      {
        // expiresIn: "24h",
      }
    );
    return token;
  }

  return {
    createToken: createToken,
  }
})();

export default tokenHelper;