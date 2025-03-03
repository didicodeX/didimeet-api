import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";
import { Request } from "express";

// Configurer le stockage Cloudinary avec le bon typage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req: Request, file: Express.Multer.File) => ({
    folder: "event_images", // 📂 Dossier Cloudinary
    format: "png", // 🔹 Format des fichiers
    public_id: `${Date.now()}-${file.originalname}`, // 🔹 Nom du fichier
  }),
});

// Middleware Multer
const upload = multer({ storage });

export default upload;
