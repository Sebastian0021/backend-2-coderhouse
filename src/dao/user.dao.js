import userModel from "./models/user.model.js";

export default class User {
  getUsers = async () => {
    try {
      const users = await userModel.find();
      return users;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  getUserById = async (uid) => {
    try {
      const user = await userModel.findById(uid);
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  getUserByEmail = async (email) => {
    try {
      const user = await userModel.findOne({ email });
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  createUser = async (user) => {
    try {
      const newUser = await userModel.create(user);
      return newUser;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  updateUser = async (uid, user) => {
    try {
      const updatedUser = await userModel.findByIdAndUpdate(uid, user, {
        new: true,
      });
      return updatedUser;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
