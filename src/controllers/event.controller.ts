import { EventService } from "../services/event.service";
import { Request, Response } from "express";
import { eventSchema } from "../utils/event.util";

export class EventController {
  private eventService: EventService;

  constructor() {
    this.eventService = new EventService();
  }

  async createEvent(req: Request, res: Response) {
    try {
      const event = await this.eventService.createEvent(req.body);
      res.status(201).json(event);
    } catch (error: Error | any) {
      res.status(500).json({ message: error.message });
    }
  }
}
