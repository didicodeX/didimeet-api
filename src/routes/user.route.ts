import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";
import { authorise } from "../middlewares/role.middleware";

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

router.post("/", authorise(["superadmin", "admin"]), (req, res) =>
  userController.createUser(req, res)
);

router.get("/", authorise(["superadmin", "admin"]), (req, res) =>
  userController.getUsers(req, res)
);

router.get("/:id", authorise(["superadmin", "admin"]), (req, res) =>
  userController.getUserById(req, res)
);

router.patch("/me", (req, res) => userController.updateUserMe(req, res));

router.patch("/:id", authorise(["superadmin", "admin"]), (req, res) =>
  userController.updateUserByAdmin(req, res)
);

router.delete("/:id", (req, res) => userController.deleteUser(req, res));

router.patch("/:id/role", authorise(["superadmin"]), (req, res) =>
  userController.updateUserRole(req, res)
);

export default router;
