import Job from '../models/JobModel.js';
import User from '../models/UserModel.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import { BadRequestError, NotFoundError } from '../errors/customErrors.js';

import mongoose from 'mongoose';
import { body, param, validationResult } from 'express-validator';

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith('No job')) {
          throw new NotFoundError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body('company').notEmpty().withMessage('company is required!'),
  body('position').notEmpty().withMessage('position is required!'),
  body('jobLocation').notEmpty().withMessage('job location is required!'),
  body('jobStatus')
    .isIn(Object.values(JOB_STATUS))
    .withMessage('invalid status value'),
  body('jobType')
    .isIn(Object.values(JOB_TYPE))
    .withMessage('invalid type value'),
]);

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError('Invalid MongoDB Id');

    const job = await Job.findById(value);
    if (!job) {
      throw new NotFoundError(`No job with id ${value}`);
    }
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError('Email already exists!');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('location').notEmpty().withMessage('location is required'),
  body('lastName').notEmpty().withMessage('last name is required'),
]);
