//nơi định nghĩa API
import express from "express";
import {
  checkCode,
  checkEmail,
  getUser,
  login,
  loginFacebook,
  resetToken,
  signUp,
} from "../controllers/userController.js";
import nodemailer from "nodemailer";
import { sendMail } from "../config/mail.js";

const userRouter = express.Router();

// API
// endpoint: viết thường, cách nhau bởi gạch ngang, kiểu dữ kiệu luôn luôn là string

userRouter.get("/get-user", getUser);

//API sign up
userRouter.post("/sign-up", signUp);

//API sign up
userRouter.post("/login", login);

//API reset token
userRouter.post("/reset-token", resetToken);

//API login facebook
userRouter.post("/login-facebook", loginFacebook);

//thư viện để gửi mail
//yarn add nodemailer
//API check mail => forget password
userRouter.post("/check-email", checkEmail);

//API check code => forget password
userRouter.post("/check-code", checkCode);

export default userRouter;
