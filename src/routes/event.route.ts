import { Router } from "express";
import { EventController } from "../controllers/event.controller";
import { EventService } from "../services/event.service";
import { authenticate } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/role.middleware";

const router = Router();

const eventService = new EventService();
const eventController = new EventController(eventService);

router.post("/", authenticate, (req, res) =>
  eventController.createEvent(req, res)
);

router.get("/",(req, res) => eventController.getEvents(req,res))

router.get("/:id",(req, res) => eventController.getEvent(req,res))

router.delete("/:id", authenticate, checkRole(["superadmin","admin","organizer"]), (req, res) =>
  eventController.deleteEvent(req, res)
);


export default router;
