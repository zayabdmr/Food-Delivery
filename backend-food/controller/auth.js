import { configDotenv } from "dotenv";
import { UserModel } from "../model/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

configDotenv();
const secret_key = process.env.SECRET_KEY;

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email or password is incorrect",
      });
    }

    const pass = await bcrypt.compare(password, user.password);

    if (!pass) {
      return res.status(401).send({
        success: false,
        message: "Email or password is incorrect",
      });
    }

    const token = jwt.sign({ ...user }, secret_key, { expiresIn: 60 * 5 });

    return res.status(200).send({
      success: true,
      token,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};




