import mongoose, { Schema, Model } from "mongoose";
import { JOB_TYPE, JOB_STATUS } from "../utils/constants.js";
import { IJobDocument } from "../types/index.js";

const JobSchema = new Schema<IJobDocument>(
  {
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FULL_TIME,
    },
    jobLocation: {
      type: String,
      default: "my city",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job: Model<IJobDocument> = mongoose.model<IJobDocument>("Job", JobSchema);

export default Job;
