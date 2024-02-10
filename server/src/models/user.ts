import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export interface UserAttributes {
  id?: number; // Define the primary key
  userName: string;
  passWord: string;
  role: string;
}

class User extends Model<UserAttributes> {
  id(id: any) {
    throw new Error("Method not implemented.");
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Define id as the primary key
      autoIncrement: true, // Optionally, set id to auto-increment
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
    sequelize,
    modelName: "User",
  }
);

export default User;
