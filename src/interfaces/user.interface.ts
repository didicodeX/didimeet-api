import { Types } from "mongoose";

export interface UserInterface {
  name?: string;
  email: string;
  password?: string;
  address?: {
    street?: string;
    city?: string;
    country?: string;
  };
  registeredEvents?: Types.ObjectId[];
}
