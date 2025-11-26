import { IUser } from "./src/models/user.model"; // adjust path to your User type/model

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // now TypeScript knows req.user exists
    }
  }
}
