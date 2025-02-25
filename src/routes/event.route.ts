import { Router } from "express";
import { EventController } from "../controllers/event.controller";
import { EventService } from "../services/event.service";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

const eventService = new EventService();
const eventController = new EventController(eventService);

router.post("/", authenticate, (req, res) =>
  eventController.createEvent(req, res)
);

export default router;
