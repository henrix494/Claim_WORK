import { Request, Response } from "express";
import Contact, { ContactAttributes } from "../models/contact";

const PostNewUser = async (
  req: Request<{}, {}, ContactAttributes>,
  res: Response
) => {
  const { firstName, lastName, country, city, street, zipcode, phone, email } =
    req.body;

  if (
    firstName !== "" &&
    lastName !== "" &&
    country !== "" &&
    city !== "" &&
    street !== "" &&
    zipcode !== "" &&
    phone !== "" &&
    email !== ""
  ) {
    try {
      const newContact = Contact.create({
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
  } else {
    res.status(400).json("חסרים שדות");
  }
};

export default PostNewUser;
