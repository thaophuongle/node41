import { Video } from "../models/video.js";

const getVideo = async (req, res) => {
  //SELECT * FROM video
  let data = await Video.findAll();
  res.send(data);
};

const createVideo = (req, res) => {};

const updateVideo = (req, res) => {};

export { getVideo, createVideo, updateVideo };
