import { UserModel } from "../model/user-model.js";
import { convertToHash } from "../utils/hash.js";

export const createUser = async (req, res) => {
  const { password, email } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return res.send({ success: false, message: "Email already exists" });
    }

    const hash = await convertToHash(password);
    const data = await UserModel.create({ ...req.body, password: hash });

    res.status(201).send({ success: true, data: data });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message || error });
  }
};

export const getUsers = async (_, res) => {
  try {
    const users = await UserModel.find();
    return res.status(200).send({
      success: true,
      users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).send({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found.",
      });
    }
    return res.status(200).send({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const updateUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found.",
      });
    }
    return res.status(200).send({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
