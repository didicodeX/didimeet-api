import { Schema, model } from "mongoose";
import { EventInterface } from "../interfaces/event.interface";

// Définition du schéma Mongoose
const EventSchema = new Schema<EventInterface>(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    description: { type: String },
    location: { type: String },
    image: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
    organizer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const EventModel = model<EventInterface>("Event", EventSchema);
