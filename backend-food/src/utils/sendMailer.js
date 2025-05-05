import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export const sendMail = async (email, subject, text) => {
  const info = {
    from: `food deliveryu <${process.env.EMAIL}>`,
    to: email,
    subject: subject,
    text: text,
  };

  try {
    return await transporter.sendMail(info);
  } catch (error) {
    return error;
  }
};
