import bcrypt from "bcrypt";
import { isValidObjectId } from "mongoose";
import { UserInterface } from "../interfaces";
import { UserModel } from "../models/user.model";

export class UserService {
  async createUser(name: string, email: string, password: string) {
    const existingUser = await this.findUserByEmail(email);
    if (existingUser) {
      throw new Error("Cet email est déjà pris !");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await UserModel.create({ name, email, password: hashedPassword });
  }

  async findUserByEmail(email: string) {
    return await UserModel.findOne({ email });
  }

  async getUsers() {
    return await UserModel.find().select("-password -__v");
  }

  async getUserById(id: string) {
    return await UserModel.findById(id);
  }

  async updateUserPartial(id: string, updateData: UserInterface) {
    return await UserModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async updateUserFull(id: string, userData: UserInterface) {
    const existingUser = await UserModel.findById(id);
    if (!existingUser) {
      throw new Error("Utilisateur introuvable ❌");
    }

    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    return await UserModel.findByIdAndUpdate(id, userData, {
      new: true,
      overwrite: true,
    });
  }

  async deleteUser(id: string) {
    if (!isValidObjectId(id)) {
      throw new Error("ID utilisateur invalide");
    }

    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new Error("Utilisateur non trouvé");
    }
  }

  async createSuperAdminIfNotExists() {
    const existingSuperAdmin = await UserModel.findOne({ role: "superadmin" });

    if (!existingSuperAdmin) {
      const hashedPassword = await bcrypt.hash("didipurple", 10); // 🛑 Change ce mot de passe après installation
      await UserModel.create({
        name: "dylane",
        email: "dylane@didicode.com",
        password: hashedPassword,
        role: "superadmin",
      });

      console.log("✅ Super Admin créé avec succès !");
    }
  }
}
