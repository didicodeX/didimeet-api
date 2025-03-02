import fs from "fs";
import path from "path";
import swaggerUI from "swagger-ui-express";

// 📌 Vérifie si l'on est en développement ou en production
const isDev = process.env.NODE_ENV !== "production";

// 📂 Détermine le bon chemin du fichier Swagger
const swaggerFilePath = path.resolve(process.cwd(), isDev ? "src/doc/swagger.json" : "build/doc/swagger.json");

// 🔍 Vérifie si le fichier Swagger existe
if (!fs.existsSync(swaggerFilePath)) {
  console.error(`❌ ERREUR : Impossible de trouver ${swaggerFilePath}`);
  process.exit(1); // Stoppe l'exécution si le fichier n'existe pas
}

// 📄 Lit et parse le fichier Swagger
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, "utf8"));

// 📌 Fonction pour configurer Swagger
const setupSwagger = (app: any) => {
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
};

export default setupSwagger;
