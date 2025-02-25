import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { registerSchema, loginSchema } from "../utils/auth.validator";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

// 🔥 Création des instances dans le bon ordre
const userService = new UserService();
const authService = new AuthService(userService);
const authController = new AuthController(authService);

router.post("/register", validate(registerSchema), (req, res) =>
  authController.register(req, res)
);

router.post("/login", validate(loginSchema), (req, res) =>
  authController.login(req, res)
);

router.post("/logout", authenticate, (req, res) =>
  authController.logout(req, res)
);

router.get("/me", authenticate, (req, res) => authController.getMe(req, res));

export default router;
