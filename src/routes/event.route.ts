import { Router } from "express";
import { EventController } from "../controllers/event.controller";

const router = Router();

const eventController = new EventController();
router.post("/", (req,res) => eventController.createEvent(req,res));

export default router;