import { Request, Response } from "express";
import { RegistrationService } from "../services/registration.service";

export class RegistrationController {
  private registrationService: RegistrationService;

  constructor(registrationService: RegistrationService) {
    this.registrationService = registrationService;
  }

  async registerToEvent(req: Request, res: Response) {

    try {
      const registration = await this.registrationService.registerUser(req.body)
      res.json({message: "User successfully registered", registration})
    } catch (error: any) {
      res.status(400).json({ message: "Erreur serveur", error: error.message });
    }
  }

  async updateRegistrationStatus(req: Request, res: Response) {
    try {
      const { status } = req.body;

      // if (!["confirmed", "rejected"].includes(status)) {
      //   return res.status(400).json({ message: "Invalid status" });
      // }

      const registration = await this.registrationService.updateRegistrationStatus(req.body);
      res.json({ message: `Registration ${status}`, registration });
    } catch (error: any) {
      res.status(400).json({ message: "Erreur serveur", error: error.message });
    }
  }
}
