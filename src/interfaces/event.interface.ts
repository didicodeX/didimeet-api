import { Types } from "mongoose";

export interface EventInterface {
  title: string;
  description: string;
  date: Date;
  organizer: Types.ObjectId;
  participants: Types.ObjectId[];
  details: {
    location: string;
    duration: number;
  };
}