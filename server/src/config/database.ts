// src/config/database.ts

import { Sequelize } from "sequelize";
import * as tedious from "tedious";
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  dialect: "mssql",
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialectModule: tedious,
  dialectOptions: {
    encrypt: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 45000,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export default sequelize;
