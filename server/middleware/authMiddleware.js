import { verifyJWT } from '../utils/tokenUtils.js';
import {
  UnauthenticatedError,
  UnauthorizedError,
} from '../errors/customErrors.js';

export const authenticateUser = (req, resizeBy, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError('Authentication invalid');

  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid');
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    // console.log(roles);
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to access this route');
    }
    next();
  };
};
