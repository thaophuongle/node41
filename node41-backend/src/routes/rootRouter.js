import express from "express";
import videoRouter from "./videoRouter.js";
import userRouter from "./userRouter.js";
// import mysql from "mysql2";

const rootRouter = express.Router();

rootRouter.use("/video", videoRouter);
rootRouter.use("/user", userRouter);
// rootRouter.use("/user", videoRouter);
// rootRouter.use("/product", videoRouter);
// rootRouter.use("/movie", videoRouter);

export default rootRouter;

//localhost:8080/video/get-video

// chuỗi kết nối CSDL
// const connect = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "1234",
//   port: "3306",
//   database: "db_youtube",
// });
