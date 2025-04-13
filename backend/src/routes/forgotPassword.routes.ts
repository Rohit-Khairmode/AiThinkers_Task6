import { Router } from "express";
import {
  forgotPassword,
  resetPassword,
} from "../controllers/forgotPassword.controller";

export const forgotPasswordRouter: Router = Router();
forgotPasswordRouter.route("/forgot-password").post(forgotPassword);
forgotPasswordRouter.route("/reset-password").post(resetPassword);
