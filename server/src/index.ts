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
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: "https://claim-work.vercel.app/",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
sequelize.sync().then(() => {
  console.log("Database synchronized");
});
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
  console.log(req.session);
});

app.get("/getAllusers", cors(corsOptions), getAllUsers); // done

app.post("/addNewUser", cors(corsOptions), PostNewUser); //done

app.put("/editUser", cors(corsOptions), EditUser); //done

app.post("/deleteUser", cors(corsOptions), deleteUser); //done

app.use("/auth", cors(corsOptions), authRouter);
app.post("/createUser", cors(corsOptions), createNewUser); //done
