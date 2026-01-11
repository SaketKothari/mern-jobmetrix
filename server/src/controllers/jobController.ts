import { Response } from "express";
import day from "dayjs";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";

import Job from "../models/JobModel.js";
import {
  AuthenticatedRequest,
  JobQueryParams,
  JobQueryObject,
  StatsResult,
  MonthlyApplication,
  DefaultStats,
} from "../types/index.js";

interface SortOptions {
  [key: string]: string;
}

export const getAllJobs = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { search, jobStatus, jobType, sort } = req.query as JobQueryParams;
  const queryObject: JobQueryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }

  if (jobStatus && jobStatus !== "all") {
    queryObject.jobStatus = jobStatus;
  }

  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  const sortOptions: SortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortKey = sortOptions[sort || "newest"] || sortOptions.newest;

  // Setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const jobs = await Job.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalJobs = await Job.countDocuments(queryObject);
  const numberOfPages = Math.ceil(totalJobs / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numberOfPages, currentPage: page, jobs });
};

export const createJob = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const getJob = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const job = await Job.findById(req.params.id);
  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: "Job modified successfully", job: updatedJob });
};

export const deleteJob = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const removedJob = await Job.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: "Job deleted", job: removedJob });
};

export const showStats = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  let stats: StatsResult[] = await Job.aggregate([
    {
      $match: { createdBy: new mongoose.Types.ObjectId(`${req.user.userId}`) },
    },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);

  const statsReduced = stats.reduce((acc: Record<string, number>, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  console.log("Stats", statsReduced);

  const defaultStats: DefaultStats = {
    pending: statsReduced.pending || 0,
    interview: statsReduced.interview || 0,
    declined: statsReduced.declined || 0,
  };

  let monthlyApplications: Array<{
    _id: { year: number; month: number };
    count: number;
  }> = await Job.aggregate([
    {
      $match: { createdBy: new mongoose.Types.ObjectId(`${req.user.userId}`) },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  const formattedMonthlyApplications: MonthlyApplication[] = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse();

  res
    .status(StatusCodes.OK)
    .json({ defaultStats, monthlyApplications: formattedMonthlyApplications });
};
