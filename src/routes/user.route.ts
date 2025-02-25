import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { UserService } from "../services/user.service";
import { checkRole } from "../middlewares/role.middleware";

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

router.get("/", checkRole(["admin"]), (req, res) => userController.getUsers(req, res));
router.get("/:id", checkRole(["admin"]), (req, res) => userController.getUserById(req, res));
router.put("/:id", checkRole(["admin"]), (req, res) =>
  userController.updateUserFull(req, res)
);
router.patch("/:id", (req, res) => userController.updateUserPartial(req, res));
router.delete("/:id", (req, res) => userController.deleteUser(req, res));

export default router;
