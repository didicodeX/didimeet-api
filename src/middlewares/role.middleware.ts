import { NextFunction, Response } from "express";
import { AuthRequest } from "./auth.middleware";

export const checkRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ message: "Accès interdit ❌" });
      return;
    }
    next();
  };
};
