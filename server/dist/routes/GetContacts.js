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
const contact_1 = __importDefault(require("../models/contact"));
const verifyUser_1 = require("./verifyUser"); // Import the verifyToken middleware
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield contact_1.default.findAll();
        res.json(users);
    }
    catch (error) {
        console.error(`Error fetching users: ${error}`);
        res.status(500).send("Internal server error");
    }
});
exports.default = [verifyUser_1.verifyToken, getAllUsers]; // Apply the verifyToken middleware before getAllUsers
//# sourceMappingURL=GetContacts.js.map