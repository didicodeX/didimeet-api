import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async createUser(req: Request, res: Response) {
    try {
      const user = await this.userService.createUser(req.body);
      res.json(user);
    } catch (error: Error | any) {
      res.json({
        message: "Impossible de creer l'utilisateur",
        error: error.message,
      });
    }
  }
}
