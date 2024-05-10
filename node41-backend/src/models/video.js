import { DataTypes, Model } from "sequelize";
import { sequelize } from "./connect.js";

export class Video extends Model {}

Video.init(
  //định nghĩa column mapping với table trong database
  {
    video_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    video_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    thumbnail: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    source: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "user_id",
      },
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "video_type",
        key: "type_id",
      },
    },
  },

  {
    //kết nối dtb, ánh xạ tên model vs tên table
    sequelize: sequelize, // lấy sequelize bên connect.js
    modelName: "Video",
    timestamps: false, //nếu ko khai báo thì table tự động thêm column UpdateAt, CreateAt
    tableName: "video", //ánh xạ tên model vs tên table
  }
);
