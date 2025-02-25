import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";
import { authorise } from "../middlewares/role.middleware";

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

router.get("/", authorise(["superadmin", "admin"]), (req, res) =>
  userController.getUsers(req, res)
);

router.get("/:id", authorise(["superadmin", "admin"]), (req, res) =>
  userController.getUserById(req, res)
);

router.put("/:id", authorise(["superadmin", "admin"]), (req, res) =>
  userController.updateUserFull(req, res)
);

router.patch("/:id", (req, res) => userController.updateUserPartial(req, res));

router.delete("/:id", (req, res) => userController.deleteUser(req, res));

router.patch("/users/:id/role", authorise(["superadmin"]), (req, res) =>
  userController.updateUserRole(req, res)
);



export default router;
