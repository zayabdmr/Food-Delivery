import { Router } from "express";
import { login } from "../controller/auth.js";

export const authRouter = Router();

authRouter.post("/", login);
