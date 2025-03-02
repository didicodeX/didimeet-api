import { Types } from "mongoose";

export interface EventInterface {
  title: string;
  date: Date;
  description: string,
  status: string;
  organizer: Types.ObjectId;
}