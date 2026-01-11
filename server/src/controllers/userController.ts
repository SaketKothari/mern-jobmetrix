import { Response } from "express";
import cloudinary from "cloudinary";
import { StatusCodes } from "http-status-codes";

import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";
import { formatImage } from "../middleware/multerMiddleware.js";
import { AuthenticatedRequest, RequestWithFile } from "../types/index.js";

export const getCurrentUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const user = await User.findOne({ _id: req.user.userId });
  if (user) {
    const userWithoutPassword = user.toJSON();
    res.status(StatusCodes.OK).json({ user: userWithoutPassword });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
  }
};

export const getApplicationStats = async (
  _req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (
  req: RequestWithFile,
  res: Response
): Promise<void> => {
  const newUser: Record<string, unknown> = { ...req.body };
  delete newUser.password;

  if (req.file) {
    const file = formatImage(req.file);

    const response = await cloudinary.v2.uploader.upload(file as string);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  if (req.file && updatedUser?.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ msg: "User updated" });
};
