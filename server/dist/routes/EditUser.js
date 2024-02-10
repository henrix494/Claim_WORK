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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contact_1 = __importDefault(require("../models/contact"));
const verifyUser_1 = require("./verifyUser");
const EditUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const contacts = data.map((item) => {
            const { id } = item, attributes = __rest(item, ["id"]);
            return Object.assign({ id }, attributes);
        });
        for (const contact of contacts) {
            yield contact_1.default.update(contact, { where: { id: contact.id } });
        }
        res.status(200).json({ message: "Contacts updated successfully" });
    }
    catch (error) {
        console.error("Error updating contacts:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.default = [verifyUser_1.verifyToken, EditUser];
//# sourceMappingURL=EditUser.js.map