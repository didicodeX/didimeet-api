import { Types } from "mongoose";

export interface UserInterface {
  name: string;
  email: string;
  password: string;
  role: string;
  events: Types.ObjectId;
}
