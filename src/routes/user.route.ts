import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";
import { authorise } from "../middlewares/role.middleware";

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

// 📌 🚀 **Actions Utilisateur**
router.get("/me", (req, res) =>
  userController.getOwnProfile(req, res) // 🔍 Récupérer son propre profil
);

router.patch("/me", (req, res) =>
  userController.updateOwnProfile(req, res) // ✏️ Modifier SON propre profil
);

router.delete("/me", (req, res) =>
  userController.deleteOwnAccount(req, res) // 🗑 Supprimer SON propre compte
);

// 📌 🚀 **Actions Admin/Superadmin**
router.post("/", authorise(["superadmin", "admin"]), (req, res) =>
  userController.createUserByAdmin(req, res) // 👑 Création d’un utilisateur par un admin/superadmin
);

router.get("/", authorise(["superadmin", "admin"]), (req, res) =>
  userController.getUsersByAdmin(req, res) // 🔍 Récupérer tous les utilisateurs
);

router.get("/:id", authorise(["superadmin", "admin"]), (req, res) =>
  userController.getUserByAdmin(req, res) // 🔍 Récupérer un utilisateur spécifique (admin)
);

router.patch("/:id", authorise(["superadmin", "admin"]), (req, res) =>
  userController.updateUserByAdmin(req, res) // ✏️ Modifier un utilisateur par un admin
);

router.delete("/:id", authorise(["superadmin", "admin"]), (req, res) =>
  userController.deleteUserByAdmin(req, res) // 🗑 Supprimer un utilisateur (admin)
);

router.patch("/:id/role", authorise(["superadmin"]), (req, res) =>
  userController.updateUserRoleBySuperadmin(req, res) // 🎩 Modifier le rôle d’un utilisateur (superadmin)
);



export default router;
