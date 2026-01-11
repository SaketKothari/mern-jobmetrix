import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import User from "../models/UserModel.js";
import { createJWT } from "../utils/tokenUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";

interface RegisterBody {
  name: string;
  email: string;
  password: string;
  lastName: string;
  location: string;
  role?: "user" | "admin";
}

interface LoginBody {
  email: string;
  password: string;
}

export const register = async (
  req: Request<object, object, RegisterBody>,
  res: Response
): Promise<void> => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "User created!" });
};

export const login = async (
  req: Request<object, object, LoginBody>,
  res: Response
): Promise<void> => {
  const user = await User.findOne({ email: req.body.email });

  // if user exists then compare password
  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser || !user)
    throw new UnauthenticatedError("Invalid credentials");

  const token = createJWT({ userId: user._id.toString(), role: user.role });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay), // expire in 1 day
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ msg: "User logged in" });
};

export const logout = (_req: Request, res: Response): void => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "User logged out!" });
};
