import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserService } from "./user.service";
import { UserInterface } from "../interfaces";

export class AuthService {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async register(name: string, email: string, password: string) {
    const user = await this.userService.createUser(name, email, password);
    console.log(user);

    const accessToken = jwt.sign(
      { id: user._id, email: user.email, name: user.name, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" }
    );

    const refreshToken = jwt.sign(
      { id: user._id, email: user.email, name: user.name, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return { user, accessToken, refreshToken };
  }

  async login(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new Error("Utilisateur introuvable.");

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) throw new Error("Mot de passe incorrect.");

    const accessToken = jwt.sign(
      { id: user._id, email: user.email, name: user.name, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" }
    );

    const refreshToken = jwt.sign(
      { id: user._id, email: user.email, name: user.name, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return { user, accessToken, refreshToken };
  }
}
