import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";

export class UserController {
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
}
