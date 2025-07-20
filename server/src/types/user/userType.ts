import { JwtPayload } from "jsonwebtoken";
export interface DecodedUser extends JwtPayload {
  sub: string;
  email: string;
}