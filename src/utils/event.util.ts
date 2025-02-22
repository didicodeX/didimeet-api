import { z } from "zod";

export const eventSchema = z
  .object({
    title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
    description: z.string().optional(),
    date: z.coerce.date().refine((date) => date > new Date(), {
      message: "La date doit être dans le futur",
    }),
    organizer: z
      .string()
      .length(24, "L'organisateur doit être un ObjectId valide")
      .regex(/^[0-9a-fA-F]{24}$/, "L'organisateur doit être un ObjectId valide"),
    participants: z
      .array(
        z
          .string()
          .length(24)
          .regex(/^[0-9a-fA-F]{24}$/, "Chaque participant doit être un ObjectId valide")
      )
      .optional(),
    details: z.object({
      location: z.string().min(3, "L'emplacement doit contenir au moins 3 caractères"),
      duration: z.number().positive().max(24, "La durée ne peut pas dépasser 24h"),
    }),
  })
  .strict(); // Empêche les champs non définis d'être ajoutés
