//setup server BE nodejs

// ctrl + J => mở terminal
// yarn init => enter tới chết

// yarn add express

import express from "express";

import rootRouter from "./routes/rootRouter.js";

const app = express();
// mở chặn CORS
// yarn add cors
import cors from "cors";
app.use(cors());
// app.use(cors({
//     origin:["http://localhost:3000","https://google.com"]
// }))

// chèn middle ware khi FE  request BE
app.use(express.json());

// khởi tạo server với port
app.listen(8080);

// ctrl+ C => tắt server
// yarn add nodemon => watching => auto restart server => developer

// định nghĩa API
// endpoint => GET: demo
// rest params: function(...rest)
// API
// endpoint: viết thường, cách nhau bởi gạch ngang, kiểu dữ kiệu luôn luôn là string
// import { createVideo, getVideo } from "./controllers/videoController.js";
// app.get("/get-video", getVideo);
// app.post("/create-video", createVideo);

app.use(rootRouter);

// MVC  MC Routes
