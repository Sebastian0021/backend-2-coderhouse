import SessionUserDto from "../dao/dto/user.session.dto.js";
import userDao from "../dao/user.dao.js";

export default class UserRepository {
  constructor() {
    this.dao = new userDao();
  }

  getUserById = async (id) => {
    const user = await this.dao.getUserById(id);
    return user;
  };

  getUserByEmail = async (email) => {
    const user = await this.dao.getUserByEmail(email);
    return user;
  };

  createUser = async (user) => {
    const userToInsert = new SessionUserDto(user);
    const newUser = await this.dao.createUser(userToInsert);
    return newUser;
  };
}
