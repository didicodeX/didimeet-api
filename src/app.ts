import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://www.myaddressesbook.com"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Custom-Header"],
  credentials: true
}));


export default app;