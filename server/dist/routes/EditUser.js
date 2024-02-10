"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contact_1 = __importDefault(require("../models/contact"));
const verifyUser_1 = require("./verifyUser");
const EditUser = async (req, res) => {
    const data = req.body;
    try {
        const contacts = data.map((item) => {
            const { id, ...attributes } = item;
            return { id, ...attributes };
        });
        for (const contact of contacts) {
            await contact_1.default.update(contact, { where: { id: contact.id } });
        }
        res.status(200).json({ message: "Contacts updated successfully" });
    }
    catch (error) {
        console.error("Error updating contacts:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.default = [verifyUser_1.verifyToken, EditUser];
//# sourceMappingURL=EditUser.js.map