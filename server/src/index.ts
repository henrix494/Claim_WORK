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
const corsOptions = {
  origin: "*",
  methods: ["POST", "GET", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
const port = process.env.PORT || 3000;

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

app.post("/getAllusers", getAllUsers); // done

app.post("/addNewUser", PostNewUser); //done

app.put("/editUser", EditUser); //done

app.post("/deleteUser", deleteUser); //done

app.use("/auth", authRouter);
app.post("/createUser", createNewUser); //done

app.post("/postmsg", Postmsg); //done
