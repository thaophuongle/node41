import { checkToken, decodeToken } from "../config/jwt.js";
import { response } from "../config/response.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

const model = initModels(sequelize);

const getVideo = async (req, res) => {
  // SELECT * FROM video JOIN video_type JOIN user
  let data = await model.video.findAll({
    include: ["type", "user"],
    // include: [model.video_type, model.users]
  });

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
  // res.send(data);
  response(res, data, "Successfully", 200);
};

const createVideo = (req, res) => {};

const updateVideo = (req, res) => {};

const getVideoType = async (req, res) => {
  try {
    let data = await model.video_type.findAll();
    // res.send(data);
    response(res, data, "Successfully", 200);
  } catch (error) {
    response(res, "", error.message, 500);
  }
};

//SELECT * FROM video WHERE type_id = typeId
const getVideoWithType = async (req, res) => {
  try {
    let { typeId } = req.params;

    let data = await model.video.findAll({
      where: {
        type_id: typeId,
      },
      include: ["type", "user"],
    });

    // res.send(data);
    response(res, data, "Successfully", 200);
  } catch (error) {
    response(res, "", error.message, 500);
  }
};

const getVideoPage = async (req, res) => {
  try {
    let { page } = req.params;
    let pageSize = 3; //pageSize có thể truyền động từ params frontend

    let index = (page - 1) * pageSize;
    //SELECT * FROM video LIMIT index, pageSize
    let data = await model.video.findAll({
      offset: index,
      limit: pageSize,
    });
    let totalData = await model.video.count();

    let totalPage = Math.ceil(totalData / pageSize);

    // res.send(data);
    response(res, { videoList: data, totalPage }, "Successfully", 200);
  } catch (error) {
    response(res, "", error.message, 500);
  }
};

const getVideoDetail = async (req, res) => {
  let { videoId } = req.params;
  let data = await model.video.findByPk(videoId, {
    include: ["type", "user"],
  });
  response(res, data, "Successfully", 200);
};

const getComment = async (req, res) => {
  let { videoId } = req.params;
  let data = await model.video_comment.findAll({
    where: {
      video_id: videoId,
    },
    include: ["user", "video"],
    order: [["date_create", "DESC"]],
  });

  response(res, data, "Successfull", 200);
};

const createComment = async (req, res) => {
  let { videoId, content } = req.body;

  //mọi thao tác với userId đều lấy qua token
  let { token } = req.headers;
  let { data } = decodeToken(token);

  //liên quan đến datetime => lấy từ server => BE
  let dateComment = new Date();

  let newData = {
    user_id: data.userId,
    video_id: videoId,
    content: content,
    date_create: dateComment,
  };
  await model.video_comment.create(newData);
  response(res, "", "Comment is posted!", 200);
};

export {
  getVideo,
  createVideo,
  updateVideo,
  getVideoType,
  getVideoWithType,
  getVideoPage,
  getVideoDetail,
  getComment,
  createComment,
};
