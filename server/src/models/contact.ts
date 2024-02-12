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

const Contact = sequelize.define(
  "Contact",
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
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    street: {
      type: DataTypes.STRING,
    },
    zipcode: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

export default Contact;
