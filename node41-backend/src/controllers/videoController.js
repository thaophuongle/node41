import { sequelize } from "../models/connect.js";
import initModels from "../models/init-models.js";

const model = initModels(sequelize);

const getVideo = async (req, res) => {
  //SELECT * FROM video
  let data = await model.video.findAll();

  //SELECT * FROM video WHERE user_id = 5
  //   let data = await model.video.findAll({
  //     where: {
  //       user_id: 5,
  //     },
  //   });

  //SELECT * FROM video WHERE video_id = 5
  //   let data = await model.video.findPk(5);

  //SELECT * FROM video LIMIT 1
  // data = await model.video.findOne();

  //SELECT * FROM video JOIN video_type
  /**
   data = await model.video.findAll({
    include: ["type", "user"]
    //include: [model.video_type, model.users] //
   })
   */
  res.send(data);
};

const createVideo = (req, res) => {};

const updateVideo = (req, res) => {};

export { getVideo, createVideo, updateVideo };
