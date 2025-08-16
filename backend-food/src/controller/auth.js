import UserModel from "../model/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { sendMails } from "../utils/sendMail.js";

dotenv.config();

const secret_key = process.env.SECRET_KEY;

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "This account doesnt exists",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Email or password wrong",
      });
    }

    const token = jwt.sign(user.toJSON(), secret_key, { expiresIn: 3600 });
    // const token = jwt.sign({...user}, secret_key, { expiresIn: 3600 }); second method

    return res.status(200).send({
      success: true,
      message: "success",
      token,
    });
  } catch (error) {
    console.error(error, "err");
    return res
      .status(400)
      .send({
        success: false,
        message: error.message,
      })
      .end();
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: true,
  port: 465,

  auth: {
    user: "zayabudmir@gmail.com",
    pass: "xvdeelthgtfvhzcp",
  },
});

export const sendMail = async (req, res) => {
  const { email, subject, text } = req.body;
  try {
    const response = await sendMails({ email, subject, text });
    res.status(200).send({ success: true, message: "success", response }).end();
  } catch (error) {
    console.error(error, "err");
    return res
      .status(400)
      .send({
        success: false,
        message: error.message,
      })
      .end();
  }
};
