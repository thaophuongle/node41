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
import { upload } from "../config/upload.js";
import compress_images from "compress-images";

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

userRouter.post("/upload-avatar", upload.single("avatar"), (req, res) => {
  let file = req.file;

  //đường dẫn hình cần tối ưu
  let input = process.cwd() + "/public/img/" + file.filename;

  //đường dẫn hình đã được tối ưu
  let output = process.cwd() + "/public/file/";

  // //get token
  // let { token } = req.headers;
  // //decode user id

  // //getUser

  // //update avatar
  // res.send(file);

  //thư viện tối ưu hình ảnh
  compress_images(
    //yarn add compress-images
    //yarn add pngguant-bin@6.0.1
    //yarn add gifsicle@5.2.1
    input,
    output,
    { compress_force: false, statistic: true, autoupdate: true },
    false,
    { jpg: { engine: "mozjpeg", command: ["-quality", "30"] } },
    { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
    { svg: { engine: "svgo", command: "--multipass" } },
    {
      gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] },
    },
    function (error, completed, statistic) {
      //xóa hình chưa tối ưu
      console.log("-------------");
      console.log(error);
      console.log(completed);
      console.log(statistic);
      console.log("-------------");
    }
  ); //hàm tối ưu hình ảnh
  res.send("OK");
});

export default userRouter;
