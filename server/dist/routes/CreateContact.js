"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contact_1 = __importDefault(require("../models/contact"));
const verifyUser_1 = require("./verifyUser");
const PostNewUser = async (req, res) => {
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
};
exports.default = [verifyUser_1.verifyToken, PostNewUser];
//# sourceMappingURL=CreateContact.js.map