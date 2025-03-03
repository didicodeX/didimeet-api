import { Types } from "mongoose";

export interface EventInterface {
  title: string;
  date: Date;
  description: string,
  status: string;
  location: string;
  image: string | null;
  organizer: Types.ObjectId;
}