import { EventModel } from "../models/event.model.js";
import { EventInterface } from "../interfaces/event.interface.js";
import { UserModel } from "../models/user.model.js";

export class EventService {
  async createEvent(eventData: EventInterface) {
    const { title, date, organizer } = eventData;

    // verifie si l'utilisateur existe deja et si il est organisateur
    const user = await UserModel.findById(organizer);
    if (!user) throw new Error("organizer not found");

    if ((user.role).toLowerCase() !== "organizer")
      throw new Error("Only organizers can create events");

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
    return await EventModel.create(eventData);
  }
}
