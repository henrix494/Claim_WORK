import { Request, Response } from "express";
import Contact, { ContactAttributes } from "../models/contact";
import { verifyToken } from "./verifyUser";
const PostNewUser = async (
  req: Request<{}, {}, ContactAttributes>,
  res: Response
) => {
  const { firstName, lastName, country, city, street, zipcode, phone, email } =
    req.body;
  console.log(req.body);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
  } else if (
    !firstName ||
    !lastName ||
    !country ||
    !city ||
    !street ||
    !zipcode ||
    !phone
  ) {
    res.status(400).send("חסרים שדות ");
  } else {
    try {
      const newContact = await Contact.create({
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
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default [verifyToken, PostNewUser];
