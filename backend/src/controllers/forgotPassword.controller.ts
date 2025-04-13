import { RequestHandler } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { sendResetEmail } from "../utils/sendResetEmail";
import { ApiResponse } from "../utils/ApiResponse";
import { passwordResetSchema } from "../utils/zodSchemas";

export const forgotPassword: RequestHandler = asyncHandler(async (req, res) => {
  console.log("req.body", req.body);
  const { username } = req.body;
  if (!username) {
    throw new ApiError(400, "username is required");
  }
  const user = await User.findOne({ username });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.ACCESS_TOKEN_SECRET || "default_access_token_secret",
    {
      expiresIn: "15m",
    }
  );
  await sendResetEmail(user.email, token);
  return res.json(new ApiResponse(200, {}, "Email sent successfully"));
});

export const resetPassword: RequestHandler = asyncHandler(async (req, res) => {
  const validationResult = passwordResetSchema.safeParse(req.body);
  if (!validationResult.success) {
    const errorMessages = Object.fromEntries(
      validationResult.error.errors.map((error) => [
        error.path[0],
        error.message,
      ])
    );
    console.log("Validation errors:", errorMessages);
    throw new ApiError(400, "Validation error", errorMessages); //400 bad request
  }
  const { token, password } = req.body;
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
    _id: string;
  };
  const user = await User.findById(decoded._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  user.password = password;
  await user.save();
  return res.json(new ApiResponse(200, {}, "Password updated successfully"));
});
