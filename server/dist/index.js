"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const cors_1 = __importDefault(require("cors"));
const GetContacts_1 = __importDefault(require("./routes/GetContacts"));
const CreateContact_1 = __importDefault(require("./routes/CreateContact"));
const EditUser_1 = __importDefault(require("./routes/EditUser"));
const DeleteUser_1 = __importDefault(require("./routes/DeleteUser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_1 = __importDefault(require("./routes/auth"));
const CreateUsers_1 = __importDefault(require("./routes/CreateUsers"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const corsOptions = {
    origin: "https://claim-work.vercel.app", // Removed trailing slash
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
    preflightContinue: false,
    exposedHeaders: ["set-cookie"],
};
app.use((0, cors_1.default)(corsOptions));
console.log(process.env.PORT);
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
database_1.default.sync().then(() => {
    console.log("Database synchronized");
});
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
    console.log(req.session);
});
app.get("/getAllusers", GetContacts_1.default); // done
app.post("/addNewUser", CreateContact_1.default); //done
app.put("/editUser", EditUser_1.default); //done
app.post("/deleteUser", DeleteUser_1.default); //done
app.use("/auth", auth_1.default);
app.post("/createUser", CreateUsers_1.default); //done
//# sourceMappingURL=index.js.map