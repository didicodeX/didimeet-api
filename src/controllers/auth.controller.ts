import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { AuthRequest } from "../middlewares/auth.middleware";

const isProduction = process.env.NODE_ENV === "production";
const cookieDomain = isProduction ? ".didicode.com" : "localhost"; // ✅ Corrige le domaine

export class AuthController {
  private authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body
  
      // 🔥 Récupère tout ce que renvoie le service
      const { user, accessToken, refreshToken } = await this.authService.register(
        name,
        email,
        password
      )
  
      // Stocker les tokens dans les cookies
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true, // ✅ Secure = true en prod, false en dev
        sameSite: "none", // ✅ Important pour éviter les blocages CORS
        domain: cookieDomain, // ✅ Définit le bon domaine
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        domain: cookieDomain,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

  
      // ✅ Retourner le user
      res.status(201).json({
        message: "Compte créé avec succès ✅",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      })
    } catch (error: any) {
      res.status(400).json({ message: error.message })
    }
  }
  

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const { user, accessToken, refreshToken } = await this.authService.login(
        email,
        password
      );

      // Stocker les tokens dans les cookies
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true, // ✅ Secure = true en prod, false en dev
        sameSite: "none", // ✅ Important pour éviter les blocages CORS
        domain: cookieDomain, // ✅ Définit le bon domaine
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        domain: cookieDomain,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        message: "Connexion réussie !",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      res.clearCookie("accessToken", { httpOnly: true, secure: true });
      res.clearCookie("refreshToken", { httpOnly: true, secure: true });
      res.status(200).json({ success: true, message: "Déconnexion réussie." });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la déconnexion.",
        error: err.message,
      });
    }
  }

  async getMe(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Non autorisé ❌" });
        return;
      }

      res.json({
        message: "Authentification réussie ✅",
        user: req.user, // Contient userId, email, name...
      });
    } catch (error: any) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  }
}
