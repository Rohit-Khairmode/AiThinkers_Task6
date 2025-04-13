import mongoose from "mongoose";
import { DB_NAME } from "../contants";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    /*
    Mongoose maintains an internal connection pool for efficient query handling.
    Mongoose automatically caches the connection, meaning all subsequent queries
    will reuse the existing connection without needing to reconnect.
    */
    console.log("mongodb connected", connectionInstance.connection.host);
  } catch (err) {
    console.log("error in src/db/index.js", err);
    process.exit(1);
  }
};
