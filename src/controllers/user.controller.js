import UserRepository from "../repositories/user.repository.js";
import UserDto from "../dao/dto/user.dto.js";

const userService = new UserRepository();

export const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.send({ status: "success", payload: users });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};
export const getUserById = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await userService.getUserById(uid);
    res.send({ status: "success", payload: user });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};
// export const createUser = async (req, res) => {
//   try {
//     const user = await userService.createUser(req.body);
//     res.send({ status: "success", payload: user });
//   } catch (error) {
//     res.status(500).send({ status: "error", error: error.message });
//   }
// };
// export const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await userService.updateUser(id, req.body);
//     res.send({ status: "success", payload: user });
//   } catch (error) {
//     res.status(500).send({ status: "error", error: error.message });
//   }
// };
// export const deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await userService.deleteUser(id);
//     res.send({ status: "success", payload: user });
//   } catch (error) {
//     res.status(500).send({ status: "error", error: error.message });
//   }
// };

export const getCurrentUser = async (req, res) => {
  res.send({ status: "success", payload: new UserDto(req.user) });
};
