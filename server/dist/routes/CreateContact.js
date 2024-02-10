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
const PostNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, country, city, street, zipcode, phone, email } = req.body;
    console.log(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    }
    else if (!firstName ||
        !lastName ||
        !country ||
        !city ||
        !street ||
        !zipcode ||
        !phone) {
        res.status(400).send("חסרים שדות ");
    }
    else {
        try {
            const newContact = contact_1.default.create({
                firstName: firstName,
                lastName: lastName,
                country: country,
                city: city,
                street: street,
                zipcode: zipcode,
                phone: phone,
                email: email,
            });
            res.status(201).json("משתמש נוצר");
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
});
exports.default = [verifyUser_1.verifyToken, PostNewUser];
//# sourceMappingURL=CreateContact.js.map