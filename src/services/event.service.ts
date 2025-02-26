import { EventModel } from "../models/event.model.js";
import { EventInterface } from "../interfaces/event.interface.js";
import { RegistrationModel } from "../models/registration.model.js";

export class EventService {
  async createEvent(userId: string, eventData: EventInterface) {
    const { title, date } = eventData;

    // 🔍 Vérifier si l'événement existe déjà
    const existingEvent = await EventModel.findOne({ title: title });
    if (existingEvent) {
      throw new Error("Cet événement existe déjà");
    }

    // 🔍 Vérifier que la date est valide
    if (date && new Date(date) < new Date()) {
      throw new Error("La date doit être dans le futur");
    }

    // ✅ Créer l'événement
    return await EventModel.create({
      ...eventData,
      organizer: userId, // 🚀 Ajout automatique de l'organisateur
    });
  }

  async getEvents() {
    return await EventModel.find();
  }

  // 🚀 1️⃣ Récupérer les événements créés par un utilisateur (organisateur)
  async getEventsCreatedByUser(userId: string) {
    return await EventModel.find({ organizer: userId });
  }

  async getEvent(id: string) {
    return await EventModel.findById(id);
  }

  // 🚀 2️⃣ Récupérer les événements auxquels un utilisateur est inscrit
  async getEventsForUser(userId: string) {
    // Récupérer les inscriptions confirmées de l'utilisateur
    const registrations = await RegistrationModel.find({
      user: userId,
      status: "confirmed", // Filtrer uniquement les inscriptions validées
    }).populate("event");
    // console.log(registrations);

    // Extraire uniquement les événements
    return registrations.map((r) => r.event);
  }

  //🚀 3️⃣ Récupérer tous les événements liés à un utilisateur (créés + inscrits)
  async getAllEventsForUser(userId: string) {
    const createdEvents = await this.getEventsCreatedByUser(userId);
    const registeredEvents = await this.getEventsForUser(userId);

    return {
      created: createdEvents,
      registered: registeredEvents,
    };
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

    // Vérifier si l'utilisateur est autorisé
    const isOrganizer =
      event.organizer && event.organizer.toString() === userId;
    const isAdmin = userRole === "superadmin" || userRole === "admin";

    if (!isAdmin && !isOrganizer) {
      throw new Error(
        "Accès refusé ❌ : Vous ne pouvez pas supprimer cet événement."
      );
    }

    // Supprimer l'événement
    return await EventModel.findByIdAndDelete(eventId);
  }

  async updateEventPartial(id: string, eventData: EventInterface) {
    return await EventModel.findByIdAndUpdate(
      id,
      { $set: eventData },
      { new: true }
    );
  }

  async updateEventFull(id: string, eventData: EventInterface) {
    return EventModel.findByIdAndUpdate(id, eventData, {
      new: true,
      overwrite: true,
    });
  }

}
