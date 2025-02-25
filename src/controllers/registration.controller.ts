import { Request, Response } from "express";
import { RegistrationService } from "../services/registration.service";
import { AuthRequest } from "../middlewares/auth.middleware";

export class RegistrationController {
  private registrationService: RegistrationService;

  constructor(registrationService: RegistrationService) {
    this.registrationService = registrationService;
  }

  async registerToEvent(req: Request, res: Response) {
    try {
      const registration = await this.registrationService.registerUser(
        req.body
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

  async updateRegistrationStatus(req: Request, res: Response) {
    try {
      const { status } = req.body;

      const registration =
        await this.registrationService.updateRegistrationStatus(req.body);
      res.json({ message: `Registration ${status}`, registration });
    } catch (error: any) {
      res.status(400).json({ message: "Erreur serveur", error: error.message });
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
}
