import { EventModel } from "../models/event.model.js";
import { EventInterface } from "../interfaces/event.interface.js";
import { UserModel } from "../models/user.model.js";
import { RegistrationModel } from "../models/registration.model.js";

export class EventService {
  async createEvent(userId:string,eventData: EventInterface) {
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


    // eventData.organizer = 

    // ✅ Créer l'événement
    return await EventModel.create({
      ...eventData,
      organizer: userId, // 🚀 Ajout automatique de l'organisateur
    });;
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
  
    // Vérifier si l'utilisateur est autorisé à supprimer l'événement
    if (userRole === "organizer" && event.organizer.toString() !== userId) {
      throw new Error("Vous ne pouvez pas supprimer un événement dont vous n'êtes pas l'auteur ❌");
    }
  
    // Supprimer l'événement
    return await EventModel.findByIdAndDelete(eventId);
  }
  
}
