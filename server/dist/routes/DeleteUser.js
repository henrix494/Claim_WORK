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
const verifyUser_1 = require("./verifyUser");
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.userID;
    console.log(id.userID);
    try {
        const delUser = yield contact_1.default.destroy({
            where: {
                id: id,
            },
        });
        res.status(204).send(`user delete at id ${id} name ${delUser}`);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.default = [verifyUser_1.verifyToken, deleteUser];
//# sourceMappingURL=DeleteUser.js.map