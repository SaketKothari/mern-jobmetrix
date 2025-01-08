import User from '../models/UserModel.js';
import { createJWT } from '../utils/tokenUtils.js';
import { UnauthenticatedError } from '../errors/customErrors.js';
import { comparePassword, hashPassword } from '../utils/passwordUtils.js';

import { StatusCodes } from 'http-status-codes';

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? 'admin' : 'user';

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'User created!' });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  // if user exists then compare password
  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser) throw new UnauthenticatedError('Invalid credentials');

  const token = createJWT({ userId: user._id, role: user.role });

  res.json({ msg: 'Login successfully', token });
};
