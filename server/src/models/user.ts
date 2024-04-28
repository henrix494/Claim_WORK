import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import Msg from "./msg";
export interface UserAttributes {
  id: number; // Define the primary key
  userName: string;
  passWord: string;
  role: string;
}

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passWord: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
User.hasMany(Msg);
Msg.belongsTo(User);
export default User;
