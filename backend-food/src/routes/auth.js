import express, { Router } from "express";
import { login, sendMail } from "../controller/auth.js";

export const authRouter = Router();

authRouter.post("/", login).get("/mail", sendMail);
