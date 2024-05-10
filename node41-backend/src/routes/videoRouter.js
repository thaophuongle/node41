//nơi định nghĩa API
import express from "express";

const videoRouter = express.Router();

// API
// endpoint: viết thường, cách nhau bởi gạch ngang, kiểu dữ kiệu luôn luôn là string
import { createVideo, getVideo } from "./controllers/videoController.js";
videoRouter.get("/video/get-video", getVideo);
videoRouter.post("/video/create-video", createVideo);

export default videoRouter;
