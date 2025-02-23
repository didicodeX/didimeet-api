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

  async updateUser(req:Request, res:Response){
    try {
      const updatedUser = await this.userService.updateUser(req.params.id,req.body)
      res.json(updatedUser)
    } catch (error:any) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  }

  async deleteUser(req: Request, res:Response){
    try {
      const deletedUser = await this.userService.deleteUser(req.params.id)
      res.json(deletedUser)
    } catch (error:any) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  }
}
