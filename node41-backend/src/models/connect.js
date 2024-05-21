//yarn add sequalize
import { Sequelize } from "sequelize";
import config from "../config/config.js";

const sequelize = new Sequelize(
  config.db_database,
  config.db_user,
  config.db_pass,
  {
    host: config.db_host,
    dialect: config.db_dialect,
    port: config.db_port,
  }
);

export default sequelize;

// test connection
// try {
//   sequelize.authenticate();
//   console.log("OK");
// } catch {
//   console.log(error);
// }

// yarn sequelize-auto -h <host> -d <database> -u <user> -x [password] -p [port] --dialect [dialect] -o [/path/to/models] -l esm
// yarn sequelize-auto -h localhost -d db_youtube -u root -x 1234 -p 3306 --dialect mysql -o src/models -l esm
