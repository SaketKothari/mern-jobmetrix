import { Router } from "express";
import rateLimiter from "express-rate-limit";

import { login, logout, register } from "../controllers/authController.js";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middleware/validationMiddleware.js";

const router = Router();

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: {
    msg: "You have exceeded the limit requests, retry after 15 minutes!",
  },
});

router.post("/register", apiLimiter, validateRegisterInput, register);
router.post("/login", apiLimiter, validateLoginInput, login);
router.get("/logout", logout);

export default router;
