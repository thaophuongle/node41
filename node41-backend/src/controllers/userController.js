import {
  checkRefreshToken,
  checkToken,
  createRefreshToken,
  createToken,
  decodeToken,
} from "../config/jwt.js";
import { sendMail } from "../config/mail.js";
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

const generateRandomString = (length = 6) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters[randomIndex];
  }

  return result;
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
      let key = generateRandomString();
      let token = createToken({ userId: checkEmail.dataValues.user_id, key });
      let refToken = createRefreshToken({
        userId: checkEmail.dataValues.user_id,
        key,
      });

      //update table 'users' in dtb
      checkEmail.refresh_token = refToken;
      //UPDATE users SET refresh_token = tokenRef WHERE user_id =
      model.users.update(checkEmail.dataValues, {
        where: {
          user_id: checkEmail.dataValues.user_id,
        },
      });

      response(res, token, "Login successfully!", 200);
    } else {
      response(res, "", "Password is incorrect!", 400);
    }
  } else {
    response(res, "", "Email does not exist!", 400);
  }
};

const resetToken = async (req, res) => {
  //check token
  let { token } = req.headers;
  let errorToken = checkToken(token);

  if (checkToken(token) != null && errorToken.name != "TokenExpiredError") {
    response(res, "", "Not Authorized", 401);
    return;
  }
  let { data } = decodeToken(token); //userId nằm trong data
  let getUser = await model.users.findByPk(data.userId);

  let tokenRef = decodeToken(getUser.dataValues.refresh_token);
  if (data.key != tokenRef.data.key) {
    response(res, "", "Not Authorized", 401);
    return;
  }

  //check refresh token => expired
  //userId
  if (checkRefreshToken(getUser.dataValues.refresh_token) != null) {
    response(res, "", "Not Authorized", 401);
    return;
  }

  //create new token
  let newToken = createToken({
    userId: getUser.dataValues.user_id,
    key: tokenRef.data.key,
  });
  response(res, newToken, "", 200);
};

const loginFacebook = async (req, res) => {
  let { userId, name, email } = req.body;

  let checkUser = await model.users.findOne({
    where: {
      face_app_id: userId,
    },
  });

  let user_id = "";

  //check tồn tại email
  //if does not exist
  if (!checkUser) {
    //INSERT INTO users (....) VALUE (.....)
    let newData = {
      full_name: name,
      email: email,
      avatar: "",
      pass_word: "",
      face_app_id: userId,
      role: "user",
      refresh_token: "",
    };
    let data = await model.users.create(newData);
    user_id = data.dataValues.user_id;
  } else {
    //exist
    user_id = checkUser.dataValues.user_id;
  }

  //exist
  let key = generateRandomString();
  let token = createToken({ userId: checkUser.dataValues.user_id, key });
  let refToken = createRefreshToken({
    userId: checkUser.dataValues.user_id,
    key,
  });

  response(res, token, "", 200);
};

const checkEmail = async (req, res) => {
  let { email } = req.body;
  //check mail
  let checkEmailExist = await model.users.findOne({
    where: {
      email: email,
    },
  });
  if (!checkEmailExist) {
    response(res, "", "Email does not exist!", 404);
    return;
  }

  //create code

  let dateNow = new Date();
  let code = generateRandomString();
  let newCode = {
    code: code,
    expired: dateNow.setMinutes(dateNow.getMinutes() + 10),
  };
  model.code.create(newCode);

  //send email code
  sendMail(email, "Reset your password", code);

  response(res, true, "Successfully", 200);
};

const checkCode = async (req, res) => {
  //check code
  let { code } = req.body;
  let checkResetCode = await model.code.findOne({
    where: {
      code: code,
    },
  });

  if (checkResetCode) {
    response(res, true, "", 200);
    model.code.destroy({
      where: {
        id: checkResetCode.dataValues.id,
      },
    });
  } else {
    response(res, false, "The code is incorrect!", 403);
  }

  //remove code
};

export {
  getUser,
  signUp,
  login,
  resetToken,
  loginFacebook,
  checkEmail,
  checkCode,
};
