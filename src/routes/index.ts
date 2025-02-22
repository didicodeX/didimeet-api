import { Router, Response, Request } from "express";
import eventRoutes from "./event.route";
import userRoutes from "./user.route";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello world</h1>");
});

router.use("/events", eventRoutes)
router.use("/users", userRoutes)

export default router;
