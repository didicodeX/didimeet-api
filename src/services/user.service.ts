import { UserInterface } from "../interfaces";
import { UserModel } from "../models/user.model";

export class UserService  {
  async createUser(userData: UserInterface) {
    const existingUser = await UserModel.findOne({email: userData.email});
    if(existingUser)
      throw new Error("Ce user existe deja")

    return await UserModel.create(userData)
  }
}