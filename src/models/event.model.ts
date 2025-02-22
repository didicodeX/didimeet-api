import { Schema, model } from "mongoose";

const EventSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    date: Date,
    organizer: { type: Schema.Types.ObjectId, ref: "User" }, // One-to-Many
    participants: { type: Schema.Types.ObjectId, ref: "User" }, // Many-to-Many
    details: {
      location: { type: String },
      duration: { type: Number }, // Exemple d'un document imbriquer
    },
  },
  { timestamps: true }
);

const EventModel = model("Event", EventSchema);
export default EventModel;
