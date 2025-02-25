import { Schema, model } from "mongoose";
import { RegistrationInterface } from "../interfaces/registration.interface";

const registrationSchema = new Schema<RegistrationInterface>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    status: { type: String, enum: ["pending", "confirmed", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

export const RegistrationModel = model<RegistrationInterface>(
  "Registration",
  registrationSchema
);
