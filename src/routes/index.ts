import { Router, Response, Request } from "express";
import eventRoutes from "./event.route";
import userRoutes from "./user.route";
import commentRoutes from "./comment.route";
import authRoutes from "./auth.route";
import registrationRoutes from "./registration.route";
import { authenticate } from "../middlewares/auth.middleware";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send(
    `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>didimeet - api</title>
</head>

<body>
  <h1 style="text-align: center; color: #333; font-family: 'arial'">Bienvenu sur l'api de <strong>didimeet</strong>,
    pour tester rendez-vous sur <br /> <a
      href="https://api.didimeet.didicode.com/docs/">https://api.didimeet.didicode.com/docs/</a></h1>
</body>

</html>`
  );
});

router.use("/events", eventRoutes);
router.use("/users", authenticate, userRoutes);
router.use("/comments", authenticate, commentRoutes);
router.use("/auth", authRoutes);
router.use("/registrations", authenticate, registrationRoutes);

export default router;
