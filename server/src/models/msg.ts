import sequelize from "../config/database";
import { DataTypes } from "sequelize";

const Msg = sequelize.define(
  "Msg",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

export default Msg;
