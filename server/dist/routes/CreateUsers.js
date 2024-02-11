"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const verifyUser_1 = require("./verifyUser");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, passWord, role } = yield req.body;
    if (!userName || !passWord || !role) {
        res.status(400).json("חסרים שדות ");
    }
    else {
        try {
            const user = yield user_1.default.findOne({ where: { userName: userName } });
            console.log(user);
            if (!user) {
                const hashedPassword = yield bcrypt_1.default.hash(passWord, 10);
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
});
exports.default = [verifyUser_1.verifyToken, createNewUser];
//# sourceMappingURL=CreateUsers.js.map