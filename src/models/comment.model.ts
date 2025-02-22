import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" }, // One-to-Many
    event: { type: Schema.Types.ObjectId, ref: "Event" }, // One-to-Many
    text: { type: String },
  },
  { timestamps: true }
);

const CommentModel = model("Comment", CommentSchema);
export default CommentModel;
