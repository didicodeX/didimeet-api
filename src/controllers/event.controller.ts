import { AuthRequest } from "../middlewares/auth.middleware";
import { EventService } from "../services/event.service";
import { Request, Response } from "express";

export class EventController {
  private eventService: EventService;

  constructor(eventService: EventService) {
    this.eventService = eventService;
  }

  async createEvent(req: Request, res: Response) {
    try {
      const event = await this.eventService.createEvent(req.body);
      res.status(201).json(event);
    } catch (error: Error | any) {
      res.status(500).json({ message: error.message });
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

  async getEvent(req: Request, res: Response) {
    try {
      const event = await this.eventService.getEvent(req.params.id);
      res.json(event);
    } catch (error: Error | any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteEvent(req: AuthRequest, res: Response) {
    try {
      console.log("req.user.id : ", req.user.id, "\nreq.params.id : ", req.params.id);
  
      const deletedEvent = await this.eventService.deleteEvent(req.params.id, req.user.id, req.user.role);
      res.json({ message: "Événement supprimé avec succès ✅", event: deletedEvent });
    } catch (error: Error | any) {
      res.status(403).json({ message: error.message });
    }
  }
  
}
