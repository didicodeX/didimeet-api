import { Router } from "express";
import { RegistrationService } from "../services/registration.service";
import { RegistrationController } from "../controllers/registration.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { isOrganizer } from "../middlewares/isOrganizer.middleware";

const router = Router();

const registrationService = new RegistrationService();
const registrationController = new RegistrationController(registrationService);

router.post("/", async (req,res) => registrationController.registerToEvent(req,res) )

router.patch("/approve",authenticate, isOrganizer, (req, res) => registrationController.updateRegistrationStatus(req, res));

export default router;