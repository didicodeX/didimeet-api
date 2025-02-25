import { Types } from "mongoose";

export interface RegistrationInterface {
  user: Types.ObjectId,
  event: Types.ObjectId,
  status: string
}