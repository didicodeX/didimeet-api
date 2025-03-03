import bcrypt from "bcrypt";
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
    return await UserModel.findById(id).select("-password -__v");
  }

  async getEventByUser(id: string) {
    return UserModel.findById(id).populate("events");
  }

  async updateUser(id: string, updateData: UserInterface) {
    // Vérifier si l'utilisateur existe
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error("Utilisateur introuvable ❌");
    }
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    return await UserModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteUser(id: string) {
    const existingUser = await UserModel.findById(id);
    console.log("Utilisateur trouvé ?", existingUser);

    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new Error("Utilisateur non trouvé");
    }

    return deletedUser;
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

  async updateUserRole(id: string, role: string) {
    const user = await UserModel.findById(id);
    if (!user) throw new Error("Utilisateur introuvable ❌");

    if (user.role === "superadmin")
      throw new Error("Impossible de modifier le Super Admin ❌");

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: id },
      { role },
      { new: true }
    );
    if (!updatedUser) throw new Error("Utilisateur non trouvé");

    return updatedUser;
  }
}
