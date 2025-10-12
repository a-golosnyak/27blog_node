import { Request } from "express";
import { UserType } from "../../database/models/types";

export interface AuthRequest extends Request {
  user?: UserType;
}
