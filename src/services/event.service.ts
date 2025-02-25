import { EventModel } from "../models/event.model.js";
import { EventInterface } from "../interfaces/event.interface.js";
import { UserModel } from "../models/user.model.js";

export class EventService {
  async createEvent(eventData: EventInterface) {
    const { title, date, organizer } = eventData;

    // 🔍 Vérifier si l'événement existe déjà
    const existingEvent = await EventModel.findOne({ title: title });
    if (existingEvent) {
      throw new Error("Cet événement existe déjà");
    }

    // 🔍 Vérifier que la date est valide
    if (date && new Date(date) < new Date()) {
      throw new Error("La date doit être dans le futur");
    }

    // 🔥 Vérifier si l'utilisateur est déjà `organizer`, sinon le promouvoir
    const user = await UserModel.findById(organizer);
    if (user && user.role.toLowerCase() === "participant") {
      user.role = "organizer";
      await user.save();
    }

    // ✅ Créer l'événement
    return await EventModel.create(eventData);
  }

  async getEvents() {
    return await EventModel.find();
  }

  async getEvent(id: string) {
    return await EventModel.findById(id);
  }

  async getUserByEmail(email: string) {
    return await EventModel.findOne({ email });
  }

  async deleteEvent(eventId: string, userId: string, userRole: string) {
    // Récupérer l'événement pour vérifier l'auteur
    const event = await EventModel.findById(eventId);
    if (!event) {
      throw new Error("Événement introuvable ❌");
    }
  
    // Vérifier si l'utilisateur est autorisé à supprimer l'événement
    if (userRole === "organizer" && event.organizer.toString() !== userId) {
      throw new Error("Vous ne pouvez pas supprimer un événement dont vous n'êtes pas l'auteur ❌");
    }
  
    // Supprimer l'événement
    return await EventModel.findByIdAndDelete(eventId);
  }
  
}
