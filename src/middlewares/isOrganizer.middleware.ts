import { Request, Response, NextFunction } from "express";
import { EventModel } from "../models/event.model";
import { AuthRequest } from "./auth.middleware"; // Middleware qui ajoute `req.user`

export const isOrganizer = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const eventId = req.body.event; // On récupère l'ID de l'événement depuis la requête
    const userId = req.user.id; // L'ID de l'utilisateur connecté (extrait du JWT)
    const role = req.user.role;

    // console.log(
    //   "\neventId : \n",
    //   eventId,
    //   "\nuserId : \n",
    //   userId
    // );

    // Vérifier si l'événement existe
    const event = await EventModel.findById(eventId);
    if (!event) {
      res.status(404).json({ message: "Event not found ❌" });
      return;
    }

    //  console.log(eventId,"\n",userId,"\n",role);

    // Vérifier si l'utilisateur connecté est bien l'organisateur de l'événement
    if (role == "organizer" && event.organizer.toString() !== userId) {
      res.status(403).json({
        message: "Access denied ❌ You are not the organizer of this event.",
      });
      return;
    }

    next(); // ✅ L'utilisateur est bien l'organisateur, on passe à la suite
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
