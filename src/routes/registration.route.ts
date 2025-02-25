import { Router } from "express";
import { RegistrationService } from "../services/registration.service";
import { RegistrationController } from "../controllers/registration.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { isOrganizer } from "../middlewares/isOrganizer.middleware";
import { authorise } from "../middlewares/role.middleware";

const router = Router();

const registrationService = new RegistrationService();
const registrationController = new RegistrationController(registrationService);

router.post("/", async (req, res) =>
  registrationController.registerToEvent(req, res)
);

router.patch(
  "/:id/status",
  authorise(["superadmin", "admin", "organizer"]),
  isOrganizer,
  (req, res) => registrationController.updateRegistrationStatus(req, res)
);

router.delete(
  "/:id",
  authorise(["superadmin", "admin", "participant"]),
  async (req, res) => registrationController.unregisterToEvent(req, res)
);


router.get("/event/:eventId", async (req, res) =>
  registrationController.getUsersForEvent(req, res)
);

export default router;