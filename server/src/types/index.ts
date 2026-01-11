import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

// User Types
export interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  lastName: string;
  location: string;
  role: "user" | "admin";
  avatar?: string;
  avatarPublicId?: string;
}

export interface IUserDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  lastName: string;
  location: string;
  role: "user" | "admin";
  avatar?: string;
  avatarPublicId?: string;
}

// Job Types
export interface IJob {
  _id: mongoose.Types.ObjectId;
  company: string;
  position: string;
  jobStatus: "pending" | "interview" | "declined";
  jobType: "full-time" | "part-time" | "internship";
  jobLocation: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IJobDocument extends IJob, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}

// Auth Types
export interface TokenPayload {
  userId: string;
  role: string;
}

export interface DecodedToken extends JwtPayload {
  userId: string;
  role: string;
}

// Request Types
export interface AuthenticatedUser {
  userId: string;
  role: string;
  testUser: boolean;
}

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}

// Query Types
export interface JobQueryParams {
  search?: string;
  jobStatus?: string;
  jobType?: string;
  sort?: string;
  page?: string;
  limit?: string;
}

export interface JobQueryObject {
  createdBy: string;
  jobStatus?: string;
  jobType?: string;
  $or?: Array<{
    position?: { $regex: string; $options: string };
    company?: { $regex: string; $options: string };
  }>;
}

// Stats Types
export interface StatsResult {
  _id: string;
  count: number;
}

export interface DefaultStats {
  pending: number;
  interview: number;
  declined: number;
}

export interface MonthlyApplication {
  date: string;
  count: number;
}

// Error Types
export interface CustomError extends Error {
  statusCode: number;
}

// Multer Types - using Express.Multer.File type
export interface RequestWithFile extends Request {
  user: AuthenticatedUser;
  file?: Express.Multer.File;
}
