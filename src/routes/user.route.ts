import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();
const userController = new UserController();

router.get("/profile", authenticate, (req, res) => userController.profile(req, res));

export default router;
