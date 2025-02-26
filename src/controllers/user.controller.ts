import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { AuthRequest } from "../middlewares/auth.middleware";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await this.userService.createUser(name, email, password);
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getUsers();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const user = await this.userService.getUserById(req.params.id);
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  }

  async updateUserMe(req: AuthRequest, res: Response) {
    try {
      const updatedUser = await this.userService.updateUserMe(
        req.user.id,
        req.body
      );

      res.json({ message: "Profil mis à jour ✅", user: updatedUser });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateUserByAdmin(req: AuthRequest, res: Response) {
    try {
      const updatedUser = await this.userService.updateUserByAdmin(
        req.params.id,
        req.body
      );

      if (!updatedUser) {
        res.status(404).json({ message: "Utilisateur introuvable ❌" });
        return;
      }

      res.json(updatedUser);
    } catch (error: any) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  }

  // async updateUserFull(req: Request, res: Response) {
  //   try {
  //     const updatedUser = await this.userService.updateUserFull(
  //       req.params.id,
  //       req.body
  //     );
  //     res.json(updatedUser);
  //   } catch (error: any) {
  //     res.status(500).json({ message: "Erreur serveur", error: error.message });
  //   }
  // }

  async deleteUser(req: Request, res: Response) {
    try {
      const deletedUser = await this.userService.deleteUser(req.params.id);
      res.json({ message: "Utilisateur supprimé avec succès ✅", deletedUser });
    } catch (error: any) {
      if (error.message === "ID utilisateur invalide") {
        res.status(400).json({ message: error.message });
        return;
      }
      if (error.message === "Utilisateur non trouvé") {
        res.status(404).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  }

  async updateUserRole(req: Request, res: Response) {
    try {
      const { role } = req.body;
      const { id } = req.params;

      const updatedUser = await this.userService.updateUserRole(id, role);
      res.json({ message: `✅ Rôle mis à jour : ${updatedUser.role}` });
    } catch (error: any) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  }
}
