import { z } from "zod";

// Schéma de validation pour l'inscription
export const registerSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  email: z.string().email("L'email n'est pas valide."),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères."),
});

// Schéma de validation pour la connexion
export const loginSchema = z.object({
  email: z.string().email("L'email n'est pas valide."),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères."),
});
