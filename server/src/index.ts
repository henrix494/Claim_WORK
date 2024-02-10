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
  origin: "https://claim-work.vercel.app", // Removed trailing slash
  methods: ["GET", "POST", "PUT"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
  preflightContinue: false,
  exposedHeaders: ["set-cookie"],
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

app.get("/getAllusers", getAllUsers); // done

app.post("/addNewUser", PostNewUser); //done

app.put("/editUser", EditUser); //done

app.post("/deleteUser", deleteUser); //done

app.use("/auth", authRouter);
app.post("/createUser", createNewUser); //done
