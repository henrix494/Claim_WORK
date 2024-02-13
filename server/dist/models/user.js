"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const msg_1 = __importDefault(require("./msg"));
const User = database_1.default.define("User", {
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
    timestamps: false,
});
User.hasMany(msg_1.default);
msg_1.default.belongsTo(User);
exports.default = User;
//# sourceMappingURL=user.js.map