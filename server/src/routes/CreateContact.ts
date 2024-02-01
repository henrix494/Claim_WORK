import { Request, Response } from "express";
import Contact, { ContactAttributes } from "../models/contact";

const PostNewUser = async (
  req: Request<{}, {}, ContactAttributes>,
  res: Response
) => {
  const clientData = req.body;
  console.log("Received data:", clientData);
  try {
    const newContact = Contact.create({
      firstName: clientData.firstName,
      lastName: clientData.lastName,
      country: clientData.country,
      city: clientData.city,
      street: clientData.street,
      zipcode: clientData.zipcode,
      phone: clientData.phone,
      email: clientData.email,
    });

    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default PostNewUser;
