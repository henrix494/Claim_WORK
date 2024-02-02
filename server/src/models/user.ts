// models/contact.ts

import { Sequelize, DataTypes, Model, DATE } from "sequelize";
import sequelize from "../config/database";

export interface UserAttributes {
  userName: string;
  passWord: string;
  role: string;
}

class User extends Model<UserAttributes> {}

User.init(
  {
    userName: {
      type: DataTypes.STRING,
    },
    passWord: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Contacts",
  }
);

export default User;
