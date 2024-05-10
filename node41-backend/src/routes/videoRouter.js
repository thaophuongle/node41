//nơi định nghĩa API
import express from "express";
import {
  createVideo,
  getVideo,
  updateVideo,
} from "../controllers/videoController.js";

const videoRouter = express.Router();

// API
// endpoint: viết thường, cách nhau bởi gạch ngang, kiểu dữ kiệu luôn luôn là string
videoRouter.get("/get-video", getVideo);
videoRouter.post("/create-video", createVideo);
videoRouter.put("/update-video", updateVideo);

export default videoRouter;
