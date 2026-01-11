import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/tokenUtils.js";
import {
  BadRequestError,
  UnauthorizedError,
  UnauthenticatedError,
} from "../errors/customErrors.js";
import { AuthenticatedRequest } from "../types/index.js";

export const authenticateUser = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("Authentication invalid");

  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === "679132f1fc21546802d6f89a";
    (req as AuthenticatedRequest).user = { userId, role, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export const authorizePermissions = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const authReq = req as AuthenticatedRequest;
    if (!roles.includes(authReq.user.role)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};

export const checkForTestUser = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const authReq = req as AuthenticatedRequest;
  if (authReq.user.testUser) {
    throw new BadRequestError("Demo user, read only!");
  }

  next();
};
