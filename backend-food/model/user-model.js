import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      minlength: 8,
    },
    address: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    isVerified: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);
