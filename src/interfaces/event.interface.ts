import { Types } from "mongoose";

export interface EventInterface {
  title: string;
  date: Date;
  organizer: Types.ObjectId;
  status: string;
}