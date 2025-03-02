import { Router, Response, Request } from "express";
import eventRoutes from "./event.route";
import userRoutes from "./user.route";
import commentRoutes from "./comment.route";
import authRoutes from "./auth.route";
import registrationRoutes from "./registration.route";
import { authenticate } from "../middlewares/auth.middleware";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello world</h1>");
});

router.use("/events", eventRoutes);
router.use("/users", authenticate, userRoutes);
router.use("/comments", authenticate, commentRoutes);
router.use("/auth", authRoutes);
router.use("/registrations", authenticate, registrationRoutes);

export default router;
