"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/auth.ts
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyUser_1 = require("./verifyUser");
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
const maxAge = 3 * 24 * 60 * 60;
const secret = process.env.JTWsecret;
const createToken = (id) => {
    if (secret) {
        return jsonwebtoken_1.default.sign({ id }, secret, { expiresIn: maxAge });
    }
};
router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await user_1.default.findOne({
            where: {
                userName: username,
            },
        });
        if (user) {
            const match = await bcrypt_1.default.compare(password, user.getDataValue("passWord"));
            if (match) {
                const token = createToken(user.id);
                res.cookie("jwt", token, {
                    httpOnly: false,
                    maxAge: maxAge * 1000,
                    sameSite: "none",
                    secure: true,
                    domain: "vercel.app",
                });
                res.status(200).json({ user });
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
});
router.get("/profile", verifyUser_1.verifyToken, async (req, res) => {
    try {
        // Access user information from req.user
        const user = req.user;
        // Check if user is null or undefined
        if (!user_1.default) {
            return res.status(404).json({ message: "User not found" });
        }
        const { id } = user;
        const userOne = await user_1.default.findOne({
            where: {
                id: id,
            },
        });
        // You can now use the user information as needed
        res.json(userOne);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map