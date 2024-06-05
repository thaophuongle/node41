//yarn add jsonwebtoken
import jwt from "jsonwebtoken";

//tạo token
export const createToken = (data) => {
  return jwt.sign({ data: data }, "SECRET", { expiresIn: "5m" }); //khóa bí mật có thể khai trong biến môi trường
};

//kiểm tra token
export const checkToken = (token) => {};

//giải mã token
export const decodeToken = (token) => {
  return jwt.decode(token);
};
