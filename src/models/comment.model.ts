import { Schema, model } from "mongoose";
import { CommentInterface } from "../interfaces";

const CommentSchema = new Schema<CommentInterface>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" }, // One-to-Many
    event: { type: Schema.Types.ObjectId, ref: "Event" }, // One-to-Many
    content: { type: String },
  },
  { timestamps: true }
);

export const CommentModel = model<CommentInterface>("Comment", CommentSchema);

