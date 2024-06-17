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
app.use(express.static(".")); //định vị đường dẫn BE để load file

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

//yarn add swagger-ui-express swagger-jsdoc
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

//options chứa cấu hình swagger
const options = {
  definition: {
    info: {
      title: "api",
      version: "1.0.0",
    },
  },
  apis: ["src/swagger/index.js"], //chứa đường dẫn load api lên swagger
};

const specs = swaggerJsDoc(options); //truyền vô middleware

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));
