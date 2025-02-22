import { Schema, model, Document } from "mongoose";

// Définition de l'interface TypeScript
export interface Event extends Document {
  title: string;
  description: string;
  date: Date;
  organizer: Schema.Types.ObjectId;
  participants: Schema.Types.ObjectId[];
  details: {
    location: string;
    duration: number;
  };
}

// Définition du schéma Mongoose
const EventSchema = new Schema<Event>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    organizer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    details: {
      location: { type: String, required: true },
      duration: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

const EventModel = model<Event>("Event", EventSchema);
export default EventModel;
