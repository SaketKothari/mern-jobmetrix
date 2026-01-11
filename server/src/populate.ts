import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { readFile } from "fs/promises";

import Job from "./models/JobModel.js";
import User from "./models/UserModel.js";

interface MockJob {
  company: string;
  position: string;
  jobStatus?: string;
  jobType?: string;
  jobLocation?: string;
}

const populate = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    const user = await User.findOne({ email: "test@test.com" });

    if (!user) {
      console.log("Test user not found");
      process.exit(1);
    }

    const jsonJobs: MockJob[] = JSON.parse(
      await readFile(new URL("./utils/mockData.json", import.meta.url), "utf-8")
    );
    const jobs = jsonJobs.map((job) => {
      return { ...job, createdBy: user._id };
    });
    await Job.deleteMany({ createdBy: user._id });

    // inject jobs
    await Job.create(jobs);
    console.log("Success");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

populate();
