import { createToken } from "../config/jwt.js";
import { response } from "../config/response.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import bcrypt from "bcrypt"; //thư viện mã hóa password

const model = initModels(sequelize);

const getUser = async (req, res) => {
  res.send("get user");
};

//yarn add bcrypt
const signUp = async (req, res) => {
  let { fullName, email, password } = req.body;

  //check email already exists or not
  let checkEmail = await model.users.findOne({
    where: {
      email: email,
    },
  });

  if (checkEmail) {
    //response ko có chức năng ngưng lệnh
    response(res, "", "Email already exists!", 400);
    return; //dùng return để ngưng lệnh
  } else {
    //INSERT INTO users (....) VALUE (.....)
    let newData = {
      full_name: fullName,
      email: email,
      avatar: "",
      pass_word: bcrypt.hashSync(password, 10),
      face_app_id: "",
      role: "user",
      refresh_token: "",
    };

    let data = model.users.create(newData);
    response(res, data, "Sign up successfully!", 200);
  }
};

const login = async (req, res) => {
  let { email, password } = req.body;

  // //check email already exists or not
  // //email = email AND pass_word= password
  // let checkEmail = await model.users.findOne({
  //   where: {
  //     email: email,
  //     pass_word: password,
  //   },
  // });

  // if (checkEmail) {
  //   //response ko có chức năng ngưng lệnh
  //   response(res, "", "Login successfully!", 200);
  // } else {
  //   response(res, "", "Email or password is incorrect!", 400);
  // }

  //check email already exists or not
  //email = email AND pass_word= password
  let checkEmail = await model.users.findOne({
    where: {
      email: email,
    },
  });

  if (checkEmail) {
    // if ((checkEmail.pass_word == password))
    //compareSync: tham số 1 là dữ liệu chưa mã hóa, tham số 2 là tham số đã mã hóa
    if (bcrypt.compareSync(password, checkEmail.pass_word)) {
      let token = createToken({ userId: checkEmail.dataValues.user_id });
      response(res, token, "Login successfully!", 200);
    } else {
      response(res, "", "Password is incorrect!", 400);
    }
  } else {
    response(res, "", "Email does not exist!", 400);
  }
};

export { getUser, signUp, login };
