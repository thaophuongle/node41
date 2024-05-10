//yarn add sequalize
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("db_youtube", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
  port: "3306",
});

//test connection
// try {
//   sequelize.authenticate();
//   console.log("OK");
// } catch {
//   console.log(error);
// }
