// src/config/database.ts
import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config({
    path: "../.env",
  });
}

import { Sequelize, Options } from "sequelize";
import { devConfig } from "./configDev";
import { ProdConfig } from "./configProd";

const config = process.env.NODE_ENV === "production" ? ProdConfig : devConfig;

const sequelize = new Sequelize(config as Options);
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export default sequelize;
