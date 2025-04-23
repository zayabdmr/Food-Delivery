import { UserModel } from "../model/user-model.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  const {
    email,
    password,
    phoneNumber,
    address,
    role,
    orderedFoods,
    isVerified,
  } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword, "password");

  try {
    const oldUser = UserModel.find({ email: email });
    if (oldUser)
      return res.status(405).send({
        success: "false",
        message: "user already created",
      });

    const user = await UserModel.create({
      email: email,
      password: hashedPassword,
      phoneNumber: phoneNumber,
      address: address,
      role: role,
      orderedFoods: orderedFoods,
      isVerified: isVerified,
    });
    res
      .status(200)
      .send({
        success: true,
        user: user,
      })
      .end();
  } catch (error) {
    console.log(error, "err");
    return res
      .status(400)
      .send({
        success: false,
        message: error,
      })
      .end();
  }
};

export const getUsers = async (__, res) => {
  try {
    const users = await UserModel.find().select("-password");
    return res
      .status(200)
      .send({
        success: true,
        users: users,
      })
      .end();
  } catch (error) {
    console.error(error, "err");
    return res
      .status(400)
      .send({
        success: false,
        message: error,
      })
      .end();
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    return res
      .status(200)
      .send({
        success: true,
        user: user,
      })
      .end();
  } catch (error) {
    console.error(error, "err");
    return res
      .status(400)
      .send({
        success: false,
        message: error,
      })
      .end();
  }
};
