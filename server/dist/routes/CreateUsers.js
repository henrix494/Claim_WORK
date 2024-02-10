"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const verifyUser_1 = require("./verifyUser");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createNewUser = async (req, res) => {
    const { userName, passWord, role } = await req.body;
    console.log(req.body);
    if (!userName || !passWord || !role) {
        res.status(400).json("חסרים שדות ");
    }
    else {
        try {
            const user = await user_1.default.findOne({ where: { userName: userName } });
            console.log(user);
            if (!user) {
                const hashedPassword = await bcrypt_1.default.hash(passWord, 10);
                const newUser = user_1.default.create({
                    userName: userName,
                    passWord: hashedPassword,
                    role: role,
                });
                res.status(201).json("משתמש נוצר");
            }
            else {
                res.status(400).json("משתמש קיים");
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};
exports.default = [verifyUser_1.verifyToken, createNewUser];
//# sourceMappingURL=CreateUsers.js.map