// Charger les variables d'environnement
import "dotenv/config"; 

// Importer l'application
import app from "./app";

// Connecter la base de données
import connectDatabase from "./config/database.config.js";
connectDatabase();

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📄 Documentation Swagger : http://localhost:${PORT}/docs`);
});
