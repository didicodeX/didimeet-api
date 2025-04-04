import { Types } from "mongoose";

export interface CommentInterface {
  user: Types.ObjectId,
  event: Types.ObjectId,
  content: string
}