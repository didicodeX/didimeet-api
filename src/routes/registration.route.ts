import { Router } from "express";
import { RegistrationService } from "../services/registration.service";
import { RegistrationController } from "../controllers/registration.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { isOrganizer } from "../middlewares/isOrganizer.middleware";

const router = Router();

const registrationService = new RegistrationService();
const registrationController = new RegistrationController(registrationService);

router.post("/register", async (req,res) => registrationController.registerToEvent(req,res) )

router.patch("/approve",authenticate, isOrganizer, (req, res) => registrationController.updateRegistrationStatus(req, res));

router.post("/unregister/:eventId", async (req,res) => registrationController.unregisterToEvent(req,res))
export default router;

router.get("/event/:eventId/users", async (req,res) => registrationController.getUsersForEvent(req,res))