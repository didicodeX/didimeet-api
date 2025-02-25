import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { AuthRequest } from "../middlewares/auth.middleware";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
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

  async updateUserPartial(req: AuthRequest, res: Response) {
    try {
      // Vérifier si l'utilisateur est autorisé à modifier ce compte
      if (req.user.role !== "admin" && req.user.id !== req.params.id) {
         res.status(403).json({ message: "Accès interdit ❌" });
         return
      }

      const updatedUser = await this.userService.updateUserPartial(req.params.id, req.body);

      if (!updatedUser) {
        res.status(404).json({ message: "Utilisateur introuvable ❌" });
        return
      }

      res.json(updatedUser);
    } catch (error: any) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  }
  
  async updateUserFull(req: Request, res: Response) {
    try {
      const updatedUser = await this.userService.updateUserFull(
        req.params.id,
        req.body
      );
      res.json(updatedUser);
    } catch (error: any) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  }

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
}
