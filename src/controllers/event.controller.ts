import { AuthRequest } from "../middlewares/auth.middleware";
import { EventService } from "../services/event.service";
import { Request, Response } from "express";

export class EventController {
  private eventService: EventService;

  constructor(eventService: EventService) {
    this.eventService = eventService;
  }

  async createEvent(req: AuthRequest, res: Response) {
    try {
      const userId = req.user.id;
      const { title, description, date, location,status, organizer } = req.body;

      // Vérifier si une image a été uploadée
      const imageUrl = req.file ? req.file.path : null;

      const newEvent = await this.eventService.createEvent(userId, {
        title,
        date,
        description,
        location,
        image: imageUrl, // Stocker l’URL de l’image
        status,
        organizer
      });

      res.status(201).json(newEvent);
    } catch (error:any) {
      res
        .status(500)
        .json({ error: "Erreur lors de la création de l'événement", message: error.message });
    }
  }

  async getEvents(req: Request, res: Response) {
    try {
      const events = await this.eventService.getEvents();
      res.json(events);
    } catch (error: Error | any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getEventsForUser(req: AuthRequest, res: Response) {
    try {
      const events = await this.eventService.getEventsForUser(req.user.id);
      res.json(events);
    } catch (error: any) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  }

  async getAllEventsForUser(req: AuthRequest, res: Response) {
    try {
      const events = await this.eventService.getAllEventsForUser(req.user.id);
      res.json(events);
    } catch (error: any) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  }

  async getEvent(req: Request, res: Response) {
    try {
      const event = await this.eventService.getEvent(req.params.id);
      res.json(event);
    } catch (error: Error | any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getEventsCreatedByUser(req: AuthRequest, res: Response) {
    try {
      const events = await this.eventService.getEventsCreatedByUser(
        req.user.id
      );
      res.json(events);
    } catch (error: any) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  }

  async deleteEvent(req: AuthRequest, res: Response) {
    try {
      const deletedEvent = await this.eventService.deleteEvent(
        req.params.id,
        req.user.id,
        req.user.role
      );
      res.json({
        message: "Événement supprimé avec succès ✅",
        event: deletedEvent,
      });
    } catch (error: Error | any) {
      res.status(403).json({ message: error.message });
    }
  }

  async updateEvent(req: Request, res: Response) {
    try {
      const updatedEvent = await this.eventService.updateEvent(
        req.params.id,
        req.body
      );
      res.json(updatedEvent);
    } catch (error: Error | any) {
      res.status(403).json({ message: error.message });
    }
  }
}
