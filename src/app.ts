import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser"
import cors from "cors";

import router from "./routes/index"; // Assure-toi du bon chemin
import { UserService } from "./services/user.service";
import setupSwagger from "./config/swagger.config";

const app = express();

app.use(bodyParser.json());
app.use(express.json()); // 🛠️ Active le middleware JSON
app.use(cookieParser()); // 🛠️ Active le middleware cookie-parser

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:4000"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const userService = new UserService();
userService.createSuperAdminIfNotExists();

// Routes
app.use("/", router); // Monte le routeur

setupSwagger(app); // Active Swagger

export default app;
