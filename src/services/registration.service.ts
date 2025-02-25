import { RegistrationModel } from "../models/registration.model";
import { EventModel } from "../models/event.model";
import { UserModel } from "../models/user.model";
import { RegistrationInterface } from "../interfaces/registration.interface";

export class RegistrationService {
  /**
   * Inscrire un utilisateur à un événement
   */
  async registerUser(registrationData: RegistrationInterface) {
    // Vérifier si l'événement existe
    const event = await EventModel.findById(registrationData.event);
    if (!event) throw new Error("Event not found");

    // Vérifier si l'utilisateur existe
    const user = await UserModel.findById(registrationData.user);
    if (!user) throw new Error("User not found");

    // Vérifier si l'utilisateur est déjà inscrit
    const existingRegistration = await RegistrationModel.findOne({
      user: registrationData.user,
      event: registrationData.event,
    });

    if (existingRegistration)
      throw new Error("User already registered for this event");


    const registration = await RegistrationModel.create({
      user: registrationData.user,
      event: registrationData.event,
      status: "pending", // 🚀 L'inscription est en attente
    });
    return registration;
  }

  /**
   * Désinscrire un utilisateur d'un événement
   */
  async unregisterUser(userId: string, eventId: string) {
    // Vérifier si l'inscription existe
    const registration = await RegistrationModel.findOne({
      user: userId,
      event: eventId,
    });
    if (!registration) throw new Error("User is not registered for this event");

    // Suppression de l'inscription
    await RegistrationModel.deleteOne({ user: userId, event: eventId });

    return registration;
  }

  async updateRegistrationStatus(registrationData: RegistrationInterface) {
    const eventId = registrationData.event;
    const userId = registrationData.user;
    const status =registrationData.status;

    const event = await EventModel.findById(eventId);
    if (!event) throw new Error("Event not found");


    // verification de l'inscription
    const registration = await RegistrationModel.findOne({
      event: eventId,
      user: userId,
    });
    if (!registration) throw new Error("Registration not found");

    // Mettre à jour le statut
    registration.status = status;
    await registration.save();

    return registration;
  }

    /**
   * 🔹 Récupérer tous les utilisateurs inscrits à un événement
   */
    async getUsersForEvent(eventId: string) {
      // Chercher les inscriptions liées à cet événement
      const registrations = await RegistrationModel.find({ event: eventId }).populate("user", "name email");
  
      // Extraire uniquement les utilisateurs
      const users = registrations.map(registration => registration.user);
  
      return users;
    }
}
