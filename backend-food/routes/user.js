import express from "express";
import { createUser, getUserById, getUsers } from "../controller/user.js";

export const userRouter = express.Router();

userRouter.post("/", createUser).get("/:id", getUserById).get("/", getUsers);
