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

    message: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true }
);

export default Msg;
