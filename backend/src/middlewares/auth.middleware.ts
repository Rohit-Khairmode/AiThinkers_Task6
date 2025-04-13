import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { Request, Response, NextFunction } from "express";
import { generateAccessAndRefereshTokens } from "../controllers/user.controller";

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    let decoded: JwtPayload | null = null;
    let userId: string | null = null;

    if (accessToken) {
      try {
        decoded = jwt.verify(
          accessToken,
          process.env.ACCESS_TOKEN_SECRET!
        ) as JwtPayload;
        userId = decoded._id;
      } catch (err) {
        console.log("Access token expired or invalid, trying refresh token...");
      }
    }

    if (!userId && refreshToken) {
      try {
        decoded = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET!
        ) as JwtPayload;
        userId = decoded._id;

        // Generate new access token
        const { accessToken: newAccessToken } =
          await generateAccessAndRefereshTokens(userId);

        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "none",
        });
      } catch (err) {
        throw new ApiError(401, "Invalid or expired tokens");
      }
    }

    if (!userId) {
      throw new ApiError(401, "Authentication required");
    }

    // 3. Fetch user
    const user = await User.findById(userId).select(
      "-password -refreshToken -registrationDate -createdAt -updatedAt -__v -termsAccepted"
    );

    if (!user) {
      throw new ApiError(404, "User not found");
    }
    req.user = user;
    next();
  } catch (error: any) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
};
