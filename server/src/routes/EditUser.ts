import { Request, Response } from "express";
import Contact, { ContactAttributes } from "../models/contact";
import { verifyToken } from "./verifyUser";
const EditUser = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const contacts: ContactAttributes[] = data.map((item: any) => {
      const { id, ...attributes } = item;
      return { id, ...attributes } as ContactAttributes;
    });

    for (const contact of contacts) {
      await Contact.update(contact, { where: { id: contact.id } });
    }

    res.status(200).json({ message: "Contacts updated successfully" });
  } catch (error) {
    console.error("Error updating contacts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default [verifyToken, EditUser];
