import { StatusCodes } from 'http-status-codes';

import Job from '../models/JobModel.js';
import User from '../models/UserModel.js';

export const getCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Get current user' });
};

export const getApplicationStats = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Application Stats' });
};

export const updateUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Update user' });
};
