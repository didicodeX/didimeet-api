import { RegistrationModel } from "../models/registration.model";
import { EventModel } from "../models/event.model";
import { UserModel } from "../models/user.model";

export class RegistrationService {
  /**
   * Inscrire un utilisateur à un événement
   */
  async registerUser(userId:string, eventId:string) {
    // Vérifier si l'événement existe
    const event = await EventModel.findById(eventId);
    if (!event) throw new Error("Event not found");

    // Vérifier si l'utilisateur existe
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("User not found");

    // Vérifier si l'utilisateur est déjà inscrit
    const existingRegistration = await RegistrationModel.findOne({
      user: userId,
      event: eventId,
    });

    if (existingRegistration)
      throw new Error("User already registered for this event");

    const registration = await RegistrationModel.create({
      user: userId,
      event: eventId,
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

  async updateRegistrationStatus(id: string, status: string) {
    return await RegistrationModel.findByIdAndUpdate(
      { _id: id },
      { status },
      { new: true }
    );
  }

  /**
   * 🔹 Récupérer tous les utilisateurs inscrits à un événement
   */
  async getUsersForEvent(eventId: string) {
    // Chercher les inscriptions liées à cet événement
    const registrations = await RegistrationModel.find({
      event: eventId,
    }).populate("user", "name email");
// console.log(registrations);

    // Extraire uniquement les utilisateurs
    const users = registrations.map((registration) => registration.user);

    return users;
  }
}
