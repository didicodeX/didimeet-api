import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Accès refusé. Token manquant ❌" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded; // ✅ Stocke l'utilisateur dans la requête

    next(); // ✅ Passe à la prochaine fonction middleware
  } catch (error) {
    res.status(403).json({ message: "Token invalide ou expiré ❌" });
  }
};
