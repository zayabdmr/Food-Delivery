import { Router } from "express";
import { login } from "../controller/auth.js";

export const aithRouter = Router();

authRouter.post("/login", login);
