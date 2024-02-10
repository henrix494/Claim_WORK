"use strict";
// models/contact.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Contact extends sequelize_1.Model {
}
Contact.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING, //dont
    },
    country: {
        type: sequelize_1.DataTypes.STRING, //done
    },
    city: {
        type: sequelize_1.DataTypes.STRING, //done
    },
    street: {
        type: sequelize_1.DataTypes.STRING, //done
    },
    zipcode: {
        type: sequelize_1.DataTypes.STRING, //done
    },
    phone: {
        type: sequelize_1.DataTypes.STRING, //done
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: database_1.default,
    modelName: "Contacts",
});
exports.default = Contact;
//# sourceMappingURL=contact.js.map