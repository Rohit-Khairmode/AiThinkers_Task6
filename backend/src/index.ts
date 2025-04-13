import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); // Load environment variables from .env file before accessing it any where
import { app } from "./app";
import { connectDB } from "./db/index.ts";
// dotenv.config({ path: "./.env" }) loads environment variables from a .env file into process.env.
connectDB().then(() => {
  app.on("error", (error) => {
    console.log("error in express", error);
    throw error;
  });

  app.listen(process.env.PORT || 8000, () => {
    console.log("App is listening on PORT", process.env.PORT);
  });

  /*
  We use process.env.PORT instead of hardcoding a port number because:
  
  - In production (e.g., cloud platforms like Heroku, Vercel, or Railway), the hosting environment dynamically assigns
    an available port and sets it in the PORT environment variable.
  - If we hardcode a port and it's already in use, our app will crash or fail to start.
  
  So, we default to port 8000 locally, but use the PORT variable when deployed.
*/
});
