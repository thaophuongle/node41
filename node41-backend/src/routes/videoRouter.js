//nơi định nghĩa API
import express from "express";
import {
  createVideo,
  getVideo,
  getVideoDetail,
  getVideoPage,
  getVideoType,
  getVideoWithType,
  updateVideo,
} from "../controllers/videoController.js";
import { checkToken, verifyToken } from "../config/jwt.js";

const videoRouter = express.Router();

// API
// endpoint: viết thường, cách nhau bởi gạch ngang, kiểu dữ kiệu luôn luôn là string
videoRouter.get("/get-video", verifyToken, getVideo);
videoRouter.post("/create-video", createVideo);
videoRouter.put("/update-video", updateVideo);

// API load video type
videoRouter.get("/get-video-type", getVideoType);

//API get video with type
videoRouter.get("/get-video-with-type/:typeId", getVideoWithType);

//API get video page
videoRouter.get("/get-video-page/:page", verifyToken, getVideoPage);

//API get video detail
videoRouter.get("/get-video-detail/:videoId", getVideoDetail);

export default videoRouter;
