import { DecodedUser } from "../user/userType.ts";

declare global {
  namespace Express {
    interface Request {
      user?: DecodedUser;
    }
  }
}
