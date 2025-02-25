import { Schema, model } from "mongoose";
import { UserInterface } from "../interfaces";

const UserSchema = new Schema<UserInterface>(
  {
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    role: {
      type: String,
      enum: ["superadmin","Admin", "Organizer", "Participant"],
      default: "Participant",
    },
  },
  { timestamps: true }
);

export const UserModel = model<UserInterface>("User", UserSchema);
