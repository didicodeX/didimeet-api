import { Router } from "express";
import { RegistrationService } from "../services/registration.service";
import { RegistrationController } from "../controllers/registration.controller";

import { authorise } from "../middlewares/role.middleware";
import { isEventOrganizer } from "../middlewares/isEventOrganizer.middleware";

const router = Router();

const registrationService = new RegistrationService();
const registrationController = new RegistrationController(registrationService);

router.post("/", async (req, res) =>
  registrationController.registerToEvent(req, res)
);

router.patch(
  "/:id/status",
  authorise(["superadmin", "admin"]),
  isEventOrganizer,
  (req, res) => registrationController.updateRegistrationStatus(req, res)
);

router.delete(
  "/:id",
  // authorise(["superadmin", "admin"]),
  async (req, res) => registrationController.unregisterToEvent(req, res)
);


router.get("/event/:eventId", async (req, res) =>
  registrationController.getUsersForEvent(req, res)
);

export default router;