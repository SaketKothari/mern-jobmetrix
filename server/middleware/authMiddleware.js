import { verifyJWT } from '../utils/tokenUtils.js';
import {
  BadRequestError,
  UnauthorizedError,
  UnauthenticatedError,
} from '../errors/customErrors.js';

export const authenticateUser = (req, resizeBy, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError('Authentication invalid');

  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === '679132f1fc21546802d6f89a';
    req.user = { userId, role, testUser };
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

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError('Demo user, read only!');
  }

  next();
};
