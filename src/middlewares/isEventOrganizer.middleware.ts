import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import { EventModel } from "../models/event.model";

export const isEventOrganizer = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const eventId = req.params.id;
  const userId = req.user.id;

  const event = await EventModel.findById(eventId);
  
  if (!event) {
     res.status(404).json({ message: "Événement non trouvé" });
     return
  }

  if (event.organizer.toString() !== userId) {
     res
      .status(403)
      .json({ message: "Accès refusé, vous n'êtes pas l'organisateur" });
      return
  }

  next();
};
