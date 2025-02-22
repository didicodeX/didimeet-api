import { Schema, model, InferSchemaType } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    address: {
      street: { type: String },
      city: { type: String },
      country: { type: String },
    },
    registeredEvents: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  },
  { timestamps: true }
);

type UserType = InferSchemaType<typeof UserSchema>;

export const UserModel = model<UserType>("User", UserSchema); // Collection : "users"
