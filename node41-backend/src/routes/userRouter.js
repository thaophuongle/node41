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

//API upload image to server
//yarn add multer

//đổi tên file
//khai báo nơi lưu
import multer, { diskStorage } from "multer";
const upload = multer({
  storage: diskStorage({
    destination: process.cwd() + "/public/img",
    filename: (req, file, callback) => {
      //DD / MM / YYYY hh:mm:ss:ms
      //get milisecond
      let mSecond = new Date().getTime();
      //đổi tên file
      callback(null, mSecond + "_" + file.originalname);
    },
  }),
  //dest: process.cwd() + "/public/img", //quy định url chưa lưu filw
});
userRouter.post("/upload-avatar", upload.single("avatar"), (req, res) => {
  let file = req.file;
  res.send(file);
});

export default userRouter;
