//yarn add jsonwebtoken
import jwt from "jsonwebtoken";

//tạo token
export const createToken = (data) => {
  return jwt.sign({ data: data }, "SECRET", { expiresIn: "200d" }); //khóa bí mật có thể khai trong biến môi trường
};

//kiểm tra token
// export const checkToken = (token) => {
//   return jwt.verify(token, "SECRET", (error, decoded) => {
//     return error;
//   });
// };
export const checkToken = (token) =>
  jwt.verify(token, "SECRET", (error) => error);

//giải mã token
export const decodeToken = (token) => {
  return jwt.decode(token);
};

//tạo refresh token
export const createRefreshToken = (data) => {
  return jwt.sign({ data: data }, "REF_TOKEN_SECRET", { expiresIn: "200d" }); //khóa bí mật của refresh token thường lâu hơn token
};

export const checkRefreshToken = (token) =>
  jwt.verify(token, "REF_TOKEN_SECRET", (error) => error);

export const verifyToken = (req, res, next) => {
  let { token } = req.headers;
  //check token
  let error = checkToken(token);
  if (error == null) {
    next();
    return;
  }

  res.status(401).send(error.name);
};
