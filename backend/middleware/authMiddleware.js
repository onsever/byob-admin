import jwt from 'jsonwebtoken';
import httpHelper from '../utils/httpHelper.js';

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["authorization"];

  if (!token) {
    return httpHelper.unauthorized(res, "A token is required for authentication", 403);
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return httpHelper.unauthorized(res, "A token is required for authentication", 401);
  }
  return next();
};

export default verifyToken;