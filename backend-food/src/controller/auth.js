// import { UserModel } from "../model/user-model.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import { sendMail } from "../utils/sendMailer.js";

// dotenv.config();

// const secret_key = process.env.SECRET_KEY;

// export const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await UserModel.findOne({ email: email }).select('+password');

//     if (!user) {
//       return res.status(404).send({
//         success: false,
//         message: "This account doesn't exists",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).send({
//         success: false,
//         message: "Email or password wrong",
//       });
//     }

//     const token = jwt.sign({ ...user }, secret_key, { expiresIn: 3600 });

//     return res.status(200).send({
//       success: true,
//       message: "success",
//       token,
//     });
//   } catch (error) {
//     console.error(error, "err");
//     return res
//       .status(400)
//       .send({
//         success: false,
//         message: error.message,
//       })
//       .end();
//   }
// };

import { UserModel } from "../model/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendMail } from "../utils/sendMailer.js";

dotenv.config();

const secret_key = process.env.SECRET_KEY;

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "This account doesn't exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Email or password is incorrect",
      });
    }

    // Зөвхөн аюулгүй талбаруудыг JWT-д багтаана
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role, // хэрвээ байгаа бол
    };

    const token = jwt.sign(payload, secret_key, { expiresIn: "1h" });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const sendMailer = async (req, res) => {
  const { email, subject, text } = req.body;
  try {
    const response = await sendMail(email, subject, text);
    res.status(200).send({ success: true, data: response });
  } catch (error) {
    res.status(500).send({ success: false, error: error });
  }
};
