import { CookieOptions, Request, RequestHandler, Response } from "express";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { uploadOnCloudinary } from "../utils/cloudinary";
import jwt from "jsonwebtoken";
import {
  publicUserDetailsSchema,
  userRegistrationSchema,
} from "../utils/zodSchemas";

export const generateAccessAndRefereshTokens = async (userId: any) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    // await user.save({ validateBeforeSave: false });
    // when validateBeforeSave set to false then it ignores all the validation we applied while creating model
    await user.save();
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

export const registerUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const validationResult = userRegistrationSchema.safeParse(req.body);
    if (!validationResult.success) {
      const errorMessages = Object.fromEntries(
        validationResult.error.errors.map((error) => [
          error.path[0],
          error.message,
        ])
      );
      throw new ApiError(400, "Validation error", errorMessages); //400 bad request
    }

    const validatedData = validationResult.data;

    const existingUserEmail = await User.findOne({
      email: validatedData.email,
    });
    if (existingUserEmail) {
      throw new ApiError(409, "User with this email already exists"); //409 conflict on server
    }

    const existingUserMobile = await User.findOne({
      mobileNumber: validatedData.mobileNumber,
    });
    if (existingUserMobile) {
      throw new ApiError(409, "User with this mobile number already exists");
    }

    let profileImageUrl;
    if (req.file) {
      const profileImageLocalPath = req.file?.path;

      if (!profileImageLocalPath) {
        throw new ApiError(400, "Profile image file is required");
      }

      // Upload to cloudinary
      const profileImage = await uploadOnCloudinary(profileImageLocalPath);
      if (!profileImage) {
        throw new ApiError(500, "Failed to upload profile image"); //500 server error
      }

      profileImageUrl = profileImage.url;
    } else {
      profileImageUrl = "";
    }

    const username = validatedData.email.split("@")[0];

    const user = await User.create({
      ...validatedData,
      dateOfBirth: new Date(validatedData.dateOfBirth),
      username,
      profileImage: profileImageUrl,
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    if (!createdUser) {
      throw new ApiError(
        500,
        "Something went wrong while registering the user"
      );
    }

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { username: createdUser.username },
          "User registered successfully"
        )
      );
  }
);
export const loginUser: RequestHandler = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    throw new ApiError(400, "username is required");
  }
  if (!password) {
    throw new ApiError(400, "password is required");
  }
  const user = await User.findOne({
    username,
  });

  if (!user) {
    throw new ApiError(404, "Invalid user credentials");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  //methods we create on model schema are available on the object return from mongodb query not on Model
  // isPasswordCorrect is not available on User (model)  instead it is available on user.

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials"); // Authorization error
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken -registrationDate -createdAt -updatedAt -__v -termsAccepted"
  );
  /* 
  this will remove password and refresh token from the response
  */

  const options: CookieOptions = {
    httpOnly: true, //this make sure that cookies are updated only on server
    secure: true /*
    when we set secure true then cookie will be sent only over https not over http 
    when we are hitting this endpoint from different origin then we have to set this to true
    else cookies will not be set if set then will be vanished  when we refresh the page( frontend)
    */,
    sameSite: "none", //this allows the cookies to set on cross origin
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options) //this we can do because of cookie-parser middleware we added
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, loggedInUser, "User logged In Successfully"));
});

export const getUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    return res
      .status(200)
      .json(new ApiResponse(200, req.user, "User fetched successfully"));
  }
);
export const logoutUser: RequestHandler = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});
export const updateUserInfo: RequestHandler = asyncHandler(async (req, res) => {
  const validationResult = publicUserDetailsSchema.safeParse(req.body);
  if (!validationResult.success) {
    const errorMessages = Object.fromEntries(
      validationResult.error.errors.map((error) => [
        error.path[0],
        error.message,
      ])
    );
    throw new ApiError(400, "Validation error", errorMessages); //400 bad request
  }
  const validatedData = validationResult.data;
  // delete validatedData.profileImage;
  const dbResult = await User.findByIdAndUpdate(
    req?.user?._id,
    {
      $set: {
        ...validatedData,
        dateOfBirth: new Date(validatedData.dateOfBirth),
      },
    },
    { new: true } //returns the updated document
  ).select(
    "-password -refreshToken -registrationDate -createdAt -updatedAt -__v -termsAccepted"
  );
  return res
    .status(200)
    .json(new ApiResponse(200, dbResult, "User updated successfully"));
});
export const updateUserProfileImage: RequestHandler = asyncHandler(
  async (req, res) => {
    let profileImageUrl;
    if (req.file) {
      const profileImageLocalPath = req.file?.path;

      if (!profileImageLocalPath) {
        throw new ApiError(400, "Profile image file is required");
      }

      // Upload to cloudinary
      const profileImage = await uploadOnCloudinary(profileImageLocalPath);
      if (!profileImage) {
        throw new ApiError(500, "Failed to upload profile image"); //500 server error
      }

      profileImageUrl = profileImage.url;
    }
    if (!profileImageUrl)
      throw new ApiError(400, "Profile image file is required");
    const dbResult = await User.findByIdAndUpdate(
      req?.user?._id,
      { $set: { profileImage: profileImageUrl } },
      { new: true } //returns the updated document
    ).select(
      "-password -refreshToken -registrationDate -createdAt -updatedAt -__v -termsAccepted"
    );
    return res
      .status(200)
      .json(
        new ApiResponse(200, dbResult, "User profile updated successfully")
      );
  }
);
