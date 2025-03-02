import { Request, Response } from "express";
import { RegistrationService } from "../services/registration.service";
import { AuthRequest } from "../middlewares/auth.middleware";

export class RegistrationController {
  private registrationService: RegistrationService;

  constructor(registrationService: RegistrationService) {
    this.registrationService = registrationService;
  }

  async registerToEvent(req: AuthRequest, res: Response) {
    try {

      const registration = await this.registrationService.registerUser(
        req.user.id,
        req.body.event
      );
      res.json({ message: "User successfully registered", registration });
    } catch (error: any) {
      res.status(400).json({ message: "Erreur serveur", error: error.message });
    }
  }

  async unregisterToEvent(req: AuthRequest, res: Response) {
    try {
      const userId = req.user.id;
      const eventId = req.params.eventId;
      const unregistration = await this.registrationService.unregisterUser(
        userId,
        eventId
      );
      res.json({ message: "User successfully unregistered", unregistration });

    } catch (error: any) {
      res.status(400).json({ message: "Erreur serveur", error: error.message });
    }
  }

  async updateRegistrationStatus(req: AuthRequest, res: Response) {
    try {
      const { registrationId } = req.params;
      const { status } = req.body;
      const organizerId = req.user?.id; // ✅ ID de l'organisateur connecté
      const userRole = req.user.role;

      if (!["pending", "confirmed", "rejected"].includes(status)) {
         res.status(400).json({ message: "Statut invalide ❌" });
         return
      }

      const updatedRegistration = await this.registrationService.updateRegistrationStatus(
        req.params.id,
        req.user.id,
        req.body.status,
        req.user.role,
      );

      res.json({ message: "Statut mis à jour ✅", registration: updatedRegistration });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getUsersForEvent(req:Request, res:Response){
    
    try {
      const users = await this.registrationService.getUsersForEvent(req.params.eventId)
      res.json(users)
    } catch (error: any) {
      res.status(400).json({ message: "Erreur serveur", error: error.message });
    }
  }

  async getRegistrationsByEvent(req: AuthRequest, res: Response) {
    try {

      const registrations = await this.registrationService.getRegistrationsByEvent(req.params.eventId);
      res.json({ message: "Inscriptions récupérées ✅", registrations });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
