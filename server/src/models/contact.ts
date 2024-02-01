// models/contact.ts

import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export interface ContactAttributes {
  id?: number;
  firstName: string;
  lastName: string;
  country?: string;
  city?: string;
  street: string;
  zipcode?: string;
  phone?: string;
  email?: string;
}

class Contact extends Model<ContactAttributes> {}

Contact.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING, //dont
    },
    country: {
      type: DataTypes.STRING, //done
    },
    city: {
      type: DataTypes.STRING, //done
    },
    street: {
      type: DataTypes.STRING, //done
    },
    zipcode: {
      type: DataTypes.STRING, //done
    },
    phone: {
      type: DataTypes.STRING, //done
    },
    email: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Contacts",
  }
);

export default Contact;
