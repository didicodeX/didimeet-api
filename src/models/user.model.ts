import { Schema, model } from "mongoose";
import { UserInterface } from "../interfaces";

const UserSchema = new Schema<UserInterface>(
  {
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    role: {
      type: String,
      enum: ["superadmin", "admin", "user"],
      default: "user",
    },
    // 🔹 Relation One-to-Many : Un utilisateur peut créer plusieurs événements
    events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  },
  { timestamps: true }
);

export const UserModel = model<UserInterface>("User", UserSchema);
