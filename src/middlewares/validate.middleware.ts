import { z } from "zod";
import { Types } from "mongoose";

import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    
    if (!result.success) {
       res.status(400).json({ errors: result.error.format() });
       return
    }

    next(); // Si les données sont valides, on passe à la suite
  };
};





// Fonction pour valider un ObjectId
const objectIdSchema = z
  .string()
  .refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
  });

// Schéma de validation avec Zod
export const userSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6),
  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      country: z.string().optional(),
    })
    .optional(),
  registeredEvents: z.array(objectIdSchema).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

/**
 * const userData = {
  email: "test@example.com",
  password: "securepass",
  registeredEvents: ["65d9f5b7e0f3a4b3c6d3e9a2"], // Simule un ObjectId
};

const result = userSchema.safeParse(userData);

if (!result.success) {
  console.error(result.error.format()); // Affiche les erreurs
} else {
  console.log("Validation réussie 🎉", result.data);
}
 */