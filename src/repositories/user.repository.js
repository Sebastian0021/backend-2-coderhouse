import UserDto from "../dao/dto/user.dto.js";
import userDao from "../dao/user.dao.js";
import SessionUserDto from "../dao/dto/user.session.dto.js";

export default class UserRepository {
  constructor() {
    this.dao = new userDao();
  }

  getUsers = async () => {
    const users = await this.dao.getUsers();
    return users.map((user) => new UserDto(user));
  };

  getUserById = async (id) => {
    const user = await this.dao.getUserById(id);
    return new UserDto(user);
  };

  createUser = async (user) => {
    const userToInsert = user;
    const newUser = await this.dao.createUser(userToInsert);
    return new UserDto(newUser);
  };

  updateUser = async (id, user) => {
    const userToUpdate = new SessionUserDto(user);
    const updatedUser = await this.dao.updateUser(id, userToUpdate);
    return new UserDto(updatedUser);
  };
}
