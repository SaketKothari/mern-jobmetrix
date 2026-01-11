import { Router } from "express";

import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from "../controllers/userController.js";

import upload from "../middleware/multerMiddleware.js";
import {
  checkForTestUser,
  authorizePermissions,
} from "../middleware/authMiddleware.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";

const router = Router();

router.get("/current-user", getCurrentUser as any);
router.get("/admin/app-stats", [
  authorizePermissions("admin"),
  getApplicationStats as any,
]);
router.patch(
  "/update-user",
  checkForTestUser,
  upload.single("avatar"),
  ...validateUpdateUserInput,
  updateUser as any
);

export default router;
