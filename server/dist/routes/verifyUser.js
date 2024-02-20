"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
// src/routes/verifyUser.ts
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV !== "production") {
    dotenv_1.default.config({
        path: "../.env",
    });
}
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    try {
        const token = req.body.jwt;
        if (token) {
            const secret = process.env.NODE_ENV === "production"
                ? process.env.JTWsecret
                : process.env.secretDEV; // Assign the value of process.env.Token to a variable
            if (secret) {
                // Check if the secret is defined
                jsonwebtoken_1.default.verify(token, secret, (err, decodedToken) => {
                    if (err) {
                        res.status(401).json({ message: "Unauthorized" });
                    }
                    else {
                        req.user = decodedToken;
                        next(); // Proceed to the next middleware
                    }
                });
            }
            else {
                res.status(401).json({ message: "Unauthorized" });
            }
        }
        else {
            res.status(401).json({ message: "Unauthorized" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifyUser.js.map