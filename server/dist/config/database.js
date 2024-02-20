"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/config/database.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: "../.env",
});
const sequelize_1 = require("sequelize");
const configDev_1 = require("./configDev");
const configProd_1 = require("./configProd");
const config = process.env.NODE_ENV === "production" ? configProd_1.ProdConfig : configDev_1.devConfig;
const sequelize = new sequelize_1.Sequelize(config);
sequelize
    .authenticate()
    .then(() => {
    console.log("Connection has been established successfully.");
})
    .catch((err) => {
    console.error("Unable to connect to the database:", err);
});
exports.default = sequelize;
//# sourceMappingURL=database.js.map