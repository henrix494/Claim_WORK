export const devConfig = {
  host: process.env.hostDEV,
  dialect: "mssql",
  username: process.env.UserNameDEV,
  password: process.env.passwordDEV,
  database: "NodeApiDemo",
  dialectOptions: {
    encrypt: true,
    options: {
      requestTimeout: 300000,
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 45000,
    idle: 10000,
  },
};
