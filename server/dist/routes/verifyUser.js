"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        const secret = process.env.JTWsecret; // Assign the value of process.env.Token to a variable
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
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifyUser.js.map