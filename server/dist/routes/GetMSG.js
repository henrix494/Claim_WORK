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
const msg_1 = __importDefault(require("../models/msg"));
const user_1 = __importDefault(require("../models/user"));
const verifyUser_1 = require("./verifyUser");
const getAllMSG = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const msgs = yield msg_1.default.findAll({
            include: [
                {
                    model: user_1.default,
                    as: "User",
                    attributes: ["id", "username"],
                },
            ],
        });
        res.status(200).json({ data: msgs });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = [verifyUser_1.verifyToken, getAllMSG];
//# sourceMappingURL=GetMSG.js.map