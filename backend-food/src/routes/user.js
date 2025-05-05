import express from "express";
import {
  createUser,
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from "../controller/user.js";

export const userRouter = express.Router();

userRouter
  .post("/", createUser)
  .get("/", getUsers)
  .get("/:id", getUserById)
  .delete("/:id", deleteUserById)
  .put("/:id", updateUserById);
