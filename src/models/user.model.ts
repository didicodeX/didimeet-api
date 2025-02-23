import { Schema, model } from "mongoose";
import { UserInterface } from "../interfaces";

const UserSchema = new Schema<UserInterface>(
  {
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String },
  },
  { timestamps: true }
);

export const UserModel = model<UserInterface>("User", UserSchema);
