import { Router } from "express";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUserInfo,
  updateUserProfileImage,
} from "../controllers/user.controller";
import { upload } from "../middlewares/multer.middlewares";
import { verifyJWT } from "../middlewares/auth.middleware";
export const userRouter: Router = Router();
userRouter.route("/register").post(upload.single("profileImage"), registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/me").get(verifyJWT, getUser);
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/update").put(verifyJWT, updateUserInfo);
userRouter
  .route("/update/profile-image")
  .put(verifyJWT, upload.single("profileImage"), updateUserProfileImage);

// upload.single middleware will add file property to req where we get path(if file stored on server)/ buffer for current uploaded file
