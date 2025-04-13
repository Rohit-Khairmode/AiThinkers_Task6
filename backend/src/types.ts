import { UserI } from "./models/user.model"; // adjust based on your project structure

declare global {
  namespace Express {
    interface Request {
      user?: UserI; // or a custom type like `{ id: string; role: string; }`
    }
  }
}
