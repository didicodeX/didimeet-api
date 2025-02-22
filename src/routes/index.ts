import {Router, Response, Request} from "express"

const router = Router();

router.use("/", async(res:Response, req:Request) => {
  res.send("Yo la famille")
})