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

// yarn sequelize-auto -h <host> -d <database> -u <user> -x [password] -p [port] --dialect [dialect] -o [/path/to/models] -l esm
// yarn sequelize-auto -h localhost -d db_youtube -u root -x 1234 -p 3306 --dialect mysql -o src/models -l esm
