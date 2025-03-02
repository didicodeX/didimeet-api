import { Router } from "express";
import { RegistrationService } from "../services/registration.service";
import { RegistrationController } from "../controllers/registration.controller";

const router = Router();

const registrationService = new RegistrationService();
const registrationController = new RegistrationController(registrationService);

router.post("/", async (req, res) =>
  registrationController.registerToEvent(req, res)
);

router.patch(
  "/:id/status",
  (req, res) => registrationController.updateRegistrationStatus(req, res)
);

router.delete(
  "/:id",
  // authorise(["superadmin", "admin"]),
  async (req, res) => registrationController.unregisterToEvent(req, res)
);

router.get("/:eventId/users", async (req, res) =>
  registrationController.getUsersForEvent(req, res)
);

router.get("/:eventId", async (req, res) =>
  registrationController.getRegistrationsByEvent(req, res)
);

export default router;
