// src/config/database.ts

import { Sequelize } from "sequelize";
import * as tedious from "tedious";
import * as azureidentity from "@azure/identity";
const sequelize = new Sequelize({
  host: "DESKTOP-FQVF9R4",
  dialect: "mssql",
  dialectModule: tedious,
  username: "sa",
  password: "134679852Aaa!",
  database: "NodeApiDemo",

  define: {
    timestamps: false,
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
