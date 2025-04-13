import bcrypt from "bcrypt";
import mongoose, { Document, Model } from "mongoose";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

export interface UserI extends Document {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  mobileNumber: string;
  gender: "male" | "female" | "other" | "prefer not to say";
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
  country: string;

  email: string;
  password: string;
  preferredCommunication: "email" | "phone" | "both";
  registrationDate?: Date;
  termsAccepted: boolean;
  username?: string;
  refreshToken?: string;
  profileImage: string;
  createdAt?: Date;
  updatedAt?: Date;

  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true, // removes white spaces from start and end
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
      match: [
        /^(\+\d{1,3}[- ]?)?\d{10,14}$/,
        "Please provide a valid mobile number",
      ],
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other", "prefer not to say"],
    },
    line1: {
      type: String,
      required: true,
      trim: true,
    },
    line2: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    zip: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ], // this will validate the email format
      index: true,
      /* this will optimize this field for searching don't add it in every field as it have performance overhead */
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          return /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(
            value
          );
        },
        message:
          "Password must be at least 8 characters long and include at least one uppercase letter and one special character",
      },
    },
    preferredCommunication: {
      type: String,
      required: true,
      enum: ["email", "phone", "both"],
      default: "email",
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
    termsAccepted: {
      type: Boolean,
      default: true,
    },
    username: {
      type: String,
      unique: true,
    },
    refreshToken: {
      type: String,
    },
    profileImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  } //this will add createdAt and updatedAt fields in document.
);

userSchema.pre("save", async function (next) {
  if (!this.username) {
    const base = this.email?.split("@")[0] || this.mobileNumber;
    let username = base;
    let counter = 1;

    const User = mongoose.model("User");

    while (await User.findOne({ username })) {
      username = `${base}${counter}`;
      counter++;
    }

    this.username = username;
  }
  next();
});
/*
this is a middleware it will excute each time before we save any data in user model.
callback inside this must not be arrow function because of 'this' keyword. 
this keyoword have access to all properties of currenlty saving object 
*/

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});
/*
Hashing is a one-way function, meaning it cannot be reversed. we can not retrieve the original password
from the hash. i.e if we have the original password then only we can retrieve the hash.
*/

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};
/* 
by accessing methods prop on schema we can create our own custom methods.
This method is available on object returned from mongoose not on the model itself 
*/

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    }, //payload
    process.env.ACCESS_TOKEN_SECRET || "default_access_token_secret",
    {
      expiresIn: "1d",
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET || "default_refresh_token_secret",
    {
      expiresIn: "10d",
    }
  );
};
export const User: Model<UserI> = mongoose.model<UserI>("User", userSchema);
