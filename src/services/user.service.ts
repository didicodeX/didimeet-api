import { UserInterface } from "../interfaces";
import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";

export class UserService {
  async createUser(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await UserModel.create({ name, email, password: hashedPassword });
  }
  async findUserByEmail(email: string) {
    return await UserModel.findOne({ email });
  }

  async getUsers() {
    return await UserModel.find();
  }

  async getUserById(id: string) {
    return await UserModel.findById(id);
  }

  async updateUser(id: string, userData: UserInterface) {
    return await UserModel.findByIdAndUpdate(id, userData, { new: true });
  }

  async deleteUser(id: string) {
    return await UserModel.findByIdAndDelete(id);
  }
}
