import { Router } from "express";
import { EventController } from "../controllers/event.controller";
import { EventService } from "../services/event.service";
import { authenticate } from "../middlewares/auth.middleware";
import { isEventOrganizer } from "../middlewares/isEventOrganizer.middleware";
import upload from "../middlewares/upload";

const router = Router();

const eventService = new EventService();
const eventController = new EventController(eventService);

router.post("/", authenticate, upload.single("image"), (req, res) =>
  eventController.createEvent(req, res)
);

router.get("/", (req, res) => eventController.getEvents(req, res));

router.get("/my-events", authenticate, (req, res) =>
  eventController.getEventsCreatedByUser(req, res)
);

router.get("/my-registrations", authenticate, (req, res) =>
  eventController.getEventsForUser(req, res)
);

router.get("/my-all-events", authenticate, async (req, res) =>
  eventController.getAllEventsForUser(req, res)
);

router.get("/:id", (req, res) => eventController.getEvent(req, res));

router.delete("/:id", authenticate, isEventOrganizer, (req, res) =>
  eventController.deleteEvent(req, res)
);

router.patch("/:id", authenticate, isEventOrganizer, (req, res) =>
  eventController.updateEvent(req, res)
);

export default router;
