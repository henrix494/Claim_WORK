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
// src/routes/auth.tsimport dotenv from "dotenv";
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV !== "production") {
    dotenv_1.default.config({
        path: "../.env",
    });
}
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyUser_1 = require("./verifyUser");
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
const maxAge = 3 * 24 * 60 * 60;
const secret = process.env.NODE_ENV === "production"
    ? process.env.JTWsecret
    : process.env.secretDEV;
const url = process.env.NODE_ENV === "production"
    ? "https://kapit-coffee.com"
    : "http://localhost:5173";
const domain = process.env.NODE_ENV === "production" ? ".kapit-coffee.com" : "localhost";
const createToken = (id, role) => {
    if (secret) {
        return jsonwebtoken_1.default.sign({ id, role }, secret, { expiresIn: maxAge });
    }
};
router.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: "Invalid username or password" });
            return;
        }
        const user = yield user_1.default.findOne({
            where: {
                userName: username,
            },
        });
        if (user) {
            const match = yield bcrypt_1.default.compare(password, user.getDataValue("passWord"));
            if (match) {
                const token = createToken(user.getDataValue("id"), user.getDataValue("role"));
                res
                    .cookie("jwt", token, {
                    httpOnly: false,
                    maxAge: maxAge * 1000,
                    domain,
                })
                    .status(200);
                res.json("logedn in");
            }
            else {
                res.status(400).json({ message: "Invalid username or password" });
            }
        }
        else {
            res.status(400).json({ message: "Invalid username or password" });
        }
    }
    catch (error) {
        next(error); // Pass any errors to the error handling middleware
    }
}));
router.post("/profile", verifyUser_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Set the 'Access-Control-Allow-Origin' header
        // Access user information from req.user
        const user = req.user;
        // Check if user is null or undefined
        if (!user_1.default) {
            return res.status(404).json({ message: "User not found" });
        }
        const { id } = user;
        const userOne = yield user_1.default.findOne({
            where: {
                id: id,
            },
        });
        // You can now use the user information as needed
        res.status(200).json(userOne);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.post("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("jwt", { domain }).status(200).json("logged out");
}));
exports.default = router;
//# sourceMappingURL=auth.js.map