import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserService } from "./user.service";

const userService = new UserService();

export class AuthService {
  async register(name: string, email: string, password: string) {
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) throw new Error("Email déjà utilisé ❌");

    return await userService.createUser(name, email, password); // ✅ Réutilisation !
  }

  async login(email: string, password: string) {
    const user = await userService.findUserByEmail(email);
    if (!user) throw new Error("Utilisateur introuvable.");

    // Vérifier le mot de passe
    if (!user.password) throw new Error("Mot de passe incorrect.");
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) throw new Error("Mot de passe incorrect.");

    const accessToken = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" }
    );

    const refreshToken = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return { user, accessToken, refreshToken };
  }
}
