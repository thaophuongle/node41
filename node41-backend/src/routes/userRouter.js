//nơi định nghĩa API
import express from "express";
import {
  getUser,
  login,
  resetToken,
  signUp,
} from "../controllers/userController.js";

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
export default userRouter;
