import { Router } from "express";
import { login, SendEmail } from "../controller/auth.js";

export const authRouter = Router();

authRouter.post("/", login).get("/mail", SendEmail);
