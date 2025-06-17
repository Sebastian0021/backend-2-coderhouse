import UserDto from "../dao/dto/user.dto";
import userDao from "../dao/user.dao.js";

export default class UserRepository {
  constructor() {
    this.dao = new userDao();
  }
  getUsers = async () => {
    const users = await this.dao.getUsers();
    return users;
  };

  getUserById = async (id) => {
    const user = await this.dao.getUserById(id);
    return user;
  };

  getUserByEmail = async (email) => {
    const user = await this.dao.getUserByEmail(email);
    return user;
  };

  createUser = async (user) => {
    const userToInsert = new UserDto(user);
    const newUser = await this.dao.createUser(userToInsert);
    return newUser;
  };
}
