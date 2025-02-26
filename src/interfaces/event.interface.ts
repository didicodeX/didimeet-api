import { Types } from "mongoose";

export interface EventInterface {
  title: string;
  date: Date;
  description: string,
  organizer: Types.ObjectId;
  status: string;
}