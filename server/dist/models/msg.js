"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
const sequelize_1 = require("sequelize");
const Msg = database_1.default.define("Msg", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
    },
    message: {
        type: sequelize_1.DataTypes.STRING,
    },
}, { timestamps: false });
exports.default = Msg;
//# sourceMappingURL=msg.js.map