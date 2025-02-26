import { Schema, model } from "mongoose";
import { EventInterface } from "../interfaces/event.interface";

// Définition du schéma Mongoose
const EventSchema = new Schema<EventInterface>(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    description: {type:String},
    organizer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const EventModel = model<EventInterface>("Event", EventSchema);
