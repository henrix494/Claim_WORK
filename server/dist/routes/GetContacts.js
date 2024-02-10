"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contact_1 = __importDefault(require("../models/contact"));
const verifyUser_1 = require("./verifyUser"); // Import the verifyToken middleware
const getAllUsers = async (req, res) => {
    try {
        const users = await contact_1.default.findAll();
        res.json(users);
    }
    catch (error) {
        console.error(`Error fetching users: ${error}`);
        res.status(500).send("Internal server error");
    }
};
exports.default = [verifyUser_1.verifyToken, getAllUsers]; // Apply the verifyToken middleware before getAllUsers
//# sourceMappingURL=GetContacts.js.map