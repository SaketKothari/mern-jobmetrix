import jwt from "jsonwebtoken";
import { TokenPayload, DecodedToken } from "../types/index.js";

export const createJWT = (payload: TokenPayload): string => {
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    } as jwt.SignOptions
  );

  return token;
};

export const verifyJWT = (token: string): DecodedToken => {
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as DecodedToken;
  return decoded;
};
