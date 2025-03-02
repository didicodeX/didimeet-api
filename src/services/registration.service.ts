import { RegistrationModel } from "../models/registration.model";
import { EventModel } from "../models/event.model";
import { UserModel } from "../models/user.model";

export class RegistrationService {
  /**
   * Inscrire un utilisateur à un événement
   */
  async registerUser(userId: string, eventId: string) {
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

  async updateRegistrationStatus(
    registrationId: string,
    organizerId: string,
    status: string,
    userRole: string
  ) {
    // 🔍 Vérifier si l'inscription existe
    const registration = await RegistrationModel.findById(registrationId);
    if (!registration) {
      throw new Error("Inscription non trouvée ❌");
    }

    // 🔍 Vérifier si l'événement existe et récupérer l'organisateur
    const event = await EventModel.findById(registration.event);
    if (!event) {
      throw new Error("Événement non trouvé ❌");
    }

    // 🔒 Vérifier si l'utilisateur est bien l'organisateur de l'événement
    const isOrganizer =
      event.organizer && event.organizer.toString() === organizerId;
    const isAdmin = userRole === "superadmin" || userRole === "admin";

    if (!isAdmin && !isOrganizer) {
      throw new Error(
        "Accès refusé ❌ : Vous ne pouvez pas supprimer cet événement."
      );
    }

    // ✅ Mettre à jour le statut
    registration.status = status;
    await registration.save();

    return registration;
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

  async getRegistrationsByEvent(eventId: string) {
    const registrations = await RegistrationModel.find({ event: eventId })
     .populate("user", "name email")
    //  .select("user status");

    if (!registrations.length) {
      throw new Error("Aucune inscription trouvée ❌");
    }

    return registrations;
  }
}
