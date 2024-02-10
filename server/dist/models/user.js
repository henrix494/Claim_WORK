"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class User extends sequelize_1.Model {
    id(id) {
        throw new Error("Method not implemented.");
    }
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true, // Define id as the primary key
        autoIncrement: true, // Optionally, set id to auto-increment
    },
    userName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    passWord: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: "User",
});
exports.default = User;
//# sourceMappingURL=user.js.map