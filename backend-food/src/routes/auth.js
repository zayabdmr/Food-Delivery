import expresse, { Router } from "express";
import {} from "../controller/user.js";
import { login, sendMail } from "../controller/auth.js";

export const authRouter = Router();

authRouter.post("/", login).get("/mail", sendMail);
