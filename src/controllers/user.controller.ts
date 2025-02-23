import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { UserService } from "../services/user.service";

export class UserController {

  private userService: UserService;

  constructor(userService: UserService){
    this.userService = userService;
  }

  async profile(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
         res.status(401).json({ message: "Non autorisé ❌" });
         return;
      }

      res.json({
        message: "Authentification réussie ✅",
        user: req.user, // Contient id, email, name...
      });
    } catch (error: any) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  }

  async getUsers(req: Request, res:Response){
    try {
      const users = await this.userService.getUsers();
      res.json(users)
      
    } catch (error:any) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  }

  async getUserById(req: Request, res: Response){
    try {
      const user = await this.userService.getUserById(req.params.id)
      res.json(user)
    } catch (error:any) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  }

  async updateUserFull(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userData = req.body;
  
      if (!userData.name || !userData.email || !userData.password) {
        res.status(400).json({ message: "Tous les champs sont requis." });
        return ;
      }
  
      const updatedUser = await this.userService.updateUser(id, userData, false); // false = mise à jour complète (PUT)
      res.json(updatedUser);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
  
  async updateUserPartial(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userData = req.body;
  
      const updatedUser = await this.userService.updateUser(id, userData, true);
      res.status(200).json(updatedUser);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
  
}
