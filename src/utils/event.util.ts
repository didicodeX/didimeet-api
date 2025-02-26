import { Types } from "mongoose";
import { z } from "zod";

// 🔹 Fonction pour valider un ObjectId de MongoDB
const objectIdSchema = z
  .string()
  .refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
  });


export const eventSchema = z
  .object({
    title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
    description: z.string().optional(),
    date: z.coerce.date().refine((date) => date > new Date(), {
      message: "La date doit être dans le futur",
    }),
    organizer: objectIdSchema, // ✅ Vérifie que c'est un ObjectId valide
    status: z.enum(["Pending", "Confirmed", "Cancelled"]).default("Pending"),
  })
  .strict(); // Empêche les champs non définis d'être ajoutés
