"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contact_1 = __importDefault(require("../models/contact"));
const verifyUser_1 = require("./verifyUser");
const deleteUser = async (req, res) => {
    const id = req.body.userID;
    console.log(id.userID);
    try {
        const delUser = await contact_1.default.destroy({
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
};
exports.default = [verifyUser_1.verifyToken, deleteUser];
//# sourceMappingURL=DeleteUser.js.map