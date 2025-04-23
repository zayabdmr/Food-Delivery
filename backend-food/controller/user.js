import bcrypt from "bcrypt";
import { UserModel } from "../model/user-model.js";

export const createUser = async (req, res) => {
  const { email, password, phoneNumber, address, role, isVerified } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const oldUser = await UserModel.findOne({ email: email });
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
      isVerified,
    });

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error, "err");
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    return res.status(200).json({
      success: true,
      users: users,
    });
  } catch (error) {
    console.error(error, "err");
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error, "err");
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
