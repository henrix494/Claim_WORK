export const devConfig = {
  host: "DESKTOP-FQVF9R4",
  dialect: "mssql",
  username: "sa",
  password: "134679852Aaa!",
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
