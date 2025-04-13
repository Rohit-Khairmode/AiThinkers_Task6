import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
export const app: express.Application = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser()); //this allowes us to store and read user's browser cookies securely
/*
use allows us to add middleware,
cors is used to allow only specific origins to send request to our backend
To prevent potential issues in production, explicitly define your frontend origin:
const allowedOrigins = ["https://example.com", "https://another-site.com"];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));
*/

app.use(express.json({ limit: "16kb" }));
// this middleware allowes request to contain body in json format (max size 16kb)

app.use(express.urlencoded({ extended: true, limit: "16kb" }));
/*
this middleware formats data coming from url because the formatting used for special characters can vary 
ex: white space can be treated as + or %20 
*/
app.use(express.static("public"));
/*
this allowes us to store files on server in ./public folder
*/
app.use(
  (
    err: any,
    _: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    console.log("error in global cache", err);

    res.status(statusCode).json({
      success: false,
      message,
      errors: err.errors || [],
    });
  }
); /*
this middleware will act as a global error handler for all the routes in our application so we can 
throw errors from any route and it will be handled here
*/

app.get("/", (req, res) => {
  res.send("Hello World");
});

// import routes
import { appointmentsRouter } from "./routes/appointments.routes";
import { forgotPasswordRouter } from "./routes/forgotPassword.routes";
import { userRouter } from "./routes/user.routes";
import {
  forgotPassword,
  resetPassword,
} from "./controllers/forgotPassword.controller";

app.use("/users", userRouter);
app.use("/appointments", appointmentsRouter);
app.post("/forgot-password", forgotPassword);
app.post("/reset-password", resetPassword);
app.use(
  (
    err: any,
    _: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    console.log("error in global cache", err);

    res.status(statusCode).json({
      success: false,
      message,
      errors: err.errors || [],
    });
  }
); /*
this middleware will act as a global error handler for all the routes in our application so we can 
throw errors from any route and it will be handled here
IMPORTANT: this should be the last middleware in the file after all routes
*/
