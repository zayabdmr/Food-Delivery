import expresse from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controller/user.js";
import { verifyToken } from "../middleware/auth.js";

export const userRouter = expresse.Router();

userRouter
  .post("/", createUser)
  .get("/", getUsers)
  .get("/:id", getUserById)
  .delete("/:id", deleteUser)
  .put("/", verifyToken, updateUser);
