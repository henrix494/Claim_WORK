// src/config/database.ts

import { Sequelize } from "sequelize";
import * as tedious from "tedious";

const sequelize = new Sequelize({
  dialect: "mssql",
  host: "DESKTOP-FQVF9R4",
  username: "sa",
  password: "134679852Aaa!",
  database: "NodeApiDemo",
  dialectModule: tedious,

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
