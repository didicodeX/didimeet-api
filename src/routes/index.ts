import { Router, Response, Request } from "express";
import eventRoutes from "./event.route";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello world</h1>");
});

router.use("/events", eventRoutes)

export default router;
