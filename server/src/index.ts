import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import sequelize from "./config/database";
import cors from "cors";
import getAllUsers from "./routes/GetContacts";
import PostNewUser from "./routes/CreateContact";
import EditUser from "./routes/EditUser";
import deleteUser from "./routes/DeleteUser";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth";
import createNewUser from "./routes/CreateUsers";
import Postmsg from "./routes/Postmsg";
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "https://claim-work.vercel.app",
  methods: "GET,HEAD,PUT,OPTIONS,POST,DELETE",
  credentials: true,
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
    "Authorization",
    "Access-Control-Allow-Origin",
  ],
  preflightContinue: false,
  exposedHeaders: ["set-cookie"],
};
app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
sequelize.sync({ alter: true }).then(() => {
  console.log("Database synchronized");
});
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
  console.log(req.session);
});

app.post("/getAllusers", cors(corsOptions), getAllUsers); // done

app.post("/addNewUser", cors(corsOptions), PostNewUser); //done

app.put("/editUser", cors(corsOptions), EditUser); //done

app.post("/deleteUser", cors(corsOptions), deleteUser); //done

app.use("/auth", cors(corsOptions), authRouter);
app.post("/createUser", cors(corsOptions), createNewUser); //done

app.post("/postmsg", cors(corsOptions), Postmsg); //done
