import { Request, Response, NextFunction, RequestHandler } from "express";
import {
  body,
  param,
  validationResult,
  ValidationChain,
} from "express-validator";
import mongoose from "mongoose";

import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { AuthenticatedRequest } from "../types/index.js";

const withValidationErrors = (
  validateValues: ValidationChain[]
): RequestHandler[] => {
  return [
    ...validateValues,
    ((req: Request, _res: Response, next: NextFunction): void => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("No job")) {
          throw new NotFoundError(errorMessages.join(", "));
        }

        if (errorMessages[0].startsWith("Not authorized")) {
          throw new UnauthorizedError("Not authorized to access this route");
        }
        throw new BadRequestError(errorMessages.join(", "));
      }
      next();
    }) as RequestHandler,
  ];
};

export const validateJobInput: RequestHandler[] = withValidationErrors([
  body("company").notEmpty().withMessage("company is required!"),
  body("position").notEmpty().withMessage("position is required!"),
  body("jobLocation").notEmpty().withMessage("job location is required!"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid status value"),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("invalid type value"),
]);

export const validateIdParam: RequestHandler[] = withValidationErrors([
  param("id").custom(async (value: string, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("Invalid MongoDB Id");

    const job = await Job.findById(value);
    if (!job) {
      throw new NotFoundError(`No job with id ${value}`);
    }

    const authReq = req as AuthenticatedRequest;
    const isAdmin = authReq.user.role === "admin";
    const isOwner = authReq.user.userId === job.createdBy.toString();

    if (!isAdmin && !isOwner)
      throw new UnauthorizedError("Not authorized to access this route");
  }),
]);

export const validateRegisterInput: RequestHandler[] = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email: string) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("Email already exists!");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("location").notEmpty().withMessage("location is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
]);

export const validateLoginInput: RequestHandler[] = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password").notEmpty().withMessage("password is required"),
]);

export const validateUpdateUserInput: RequestHandler[] = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email: string, { req }) => {
      const authReq = req as AuthenticatedRequest;
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== authReq.user.userId) {
        throw new BadRequestError("Email already exists!");
      }
    }),
  body("location").notEmpty().withMessage("location is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
]);
