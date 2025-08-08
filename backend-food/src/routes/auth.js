// // import { Router } from "express";
// // import { login, sendMailer } from "../controller/auth.js";

// // export const authRouter = Router();

// // authRouter.post("/", login).get("/mail", sendMailer);

// export const authRouter = express.Router();

// const express = require("express");
// const { checkEmail, signup } = require("../controllers/signupController");

// const router = express.Router();

// router.post("/check-email", checkEmail);
// router.post("/signup", signup);

// module.exports = router;

import express from "express";
// import { checkEmail, signup } from "../controllers/signupController.js";

export const authRouter = express.Router();

// authRouter.post("/check-email", checkEmail);
// authRouter.post("/signup", signup);
