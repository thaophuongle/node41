//yarn add multer

//đổi tên file
//khai báo nơi lưu
import multer, { diskStorage } from "multer";
export const upload = multer({
  storage: diskStorage({
    destination: process.cwd() + "/public/img",
    filename: (req, file, callback) => {
      //DD / MM / YYYY hh:mm:ss:ms
      //get milisecond
      let mSecond = new Date().getTime();
      //đổi tên file
      callback(null, mSecond + "_" + file.originalname);
    },
  }),
  //dest: process.cwd() + "/public/img", //quy định url chưa lưu filw
});
