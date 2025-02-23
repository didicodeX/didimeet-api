import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import router from "./routes/index"; // Assure-toi du bon chemin
const app = express();

app.use(express.json()); // 🛠️ Active le middleware JSON
app.use(cookieParser()); // 🛠️ Active le middleware cookie-parser

app.use(
  cors({
    origin: ["http://localhost:5173", "https://www.myaddressesbook.com"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Custom-Header"],
    credentials: true,
  })
);

// Routes
app.use("/", router); // Monte le routeur

export default app;
