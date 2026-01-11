import { Router } from "express";

import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} from "../controllers/jobController.js";

import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

const router = Router();

router
  .route("/")
  .get(getAllJobs as any)
  .post(checkForTestUser, ...validateJobInput, createJob as any);

router.route("/stats").get(showStats as any);

router
  .route("/:id")
  .get(...validateIdParam, getJob as any)
  .patch(
    checkForTestUser,
    ...validateJobInput,
    ...validateIdParam,
    updateJob as any
  )
  .delete(checkForTestUser, ...validateIdParam, deleteJob as any);

export default router;
