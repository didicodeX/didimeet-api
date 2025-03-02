import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { AuthRequest } from "../middlewares/auth.middleware";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async createUserByAdmin(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await this.userService.createUser(name, email, password);
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  }

  async getUsersByAdmin(req: Request, res: Response) {
    try {
      const users = await this.userService.getUsers();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  }

  async getUserByAdmin(req: Request, res: Response) {
    try {
      const user = await this.userService.getUserById(req.params.id);
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  }

  async updateUserByAdmin(req: AuthRequest, res: Response) {
    try {
      const updatedUser = await this.userService.updateUser(
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

  async getOwnProfile(req: AuthRequest, res: Response) {
    try {
      const userId = req.user.id; // ✅ ID récupéré depuis le token

      const user = await this.userService.getUserById(userId); 
      
      if (!user) {
         res.status(404).json({ message: "Utilisateur non trouvé ❌" });
         return
      }
  
      res.status(200).json(user);
    } catch (error:any) {
      res.status(500).json({ message: "Erreur serveur 🚨", error: error.message });
    }
  }
  

  async updateOwnProfile(req: AuthRequest, res: Response) {
    try {
      const updatedUser = await this.userService.updateUser(
        req.user.id,
        req.body
      );

      res.json({ message: "Profil mis à jour ✅", user: updatedUser });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteOwnAccount(req: AuthRequest, res: Response) {
    try {
      const deletedUser = await this.userService.deleteUser(req.user.id);
      if (!deletedUser) {
         res.status(404).json({ message: "Utilisateur introuvable ❌" });
         return
      }

      res.status(200).json({ message: "Compte supprimé avec succès ✅", deletedUser });
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

  async deleteUserByAdmin(req: Request, res: Response) {
    try {
      const deletedUser = await this.userService.deleteUser(req.params.id);
      res.status(200).json({ message: "Utilisateur supprimé avec succès ✅", deletedUser });
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

  async updateUserRoleBySuperadmin(req: Request, res: Response) {
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
