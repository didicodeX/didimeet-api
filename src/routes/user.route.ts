import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { UserService } from "../services/user.service";

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

router.get("/profile", authenticate, (req, res) =>
  userController.profile(req, res)
);
router.get("/", (req, res) => userController.getUsers(req, res));
router.get("/:id", (req, res) => userController.getUserById(req, res));
router.patch("/:id", (req, res) => userController.updateUser(req, res));// PATCH = mise à jour partielle 
// router.patch("/:id", (req, res) => userController.updateUserPartial(req, res));  // PUT = mise à jour complète
router.delete("/:id",(req,res)=> userController.deleteUser(req,res))


export default router;
