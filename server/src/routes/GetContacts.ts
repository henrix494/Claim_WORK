import { Request, Response } from "express";
import Contact from "../models/contact";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await Contact.findAll();
    res.json(users);
  } catch (error) {
    console.error(`Error fething  ${error}`);
    res.status(500).send("internal server error");
  }
};

export default getAllUsers;
