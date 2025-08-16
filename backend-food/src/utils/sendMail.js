import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: true,
  port: 465,

  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const sendMails = async ({ email, subject, text }) => {
  const info = {
    from: `food delivery <${process.env.EMAIL}>`,
    to: email,
    subject: subject,
    text: text,
  };
  try {
    return await transporter.sendMail(info);
  } catch (error) {
    return error, console.log(error);
  }
};
