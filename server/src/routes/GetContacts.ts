import { Request, Response } from "express";
import Contact from "../models/contact";
import { verifyToken } from "./verifyUser"; // Import the verifyToken middleware

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await Contact.findAll();
    res.json(users);
  } catch (error) {
    console.error(`Error fetching users: ${error}`);
    res.status(500).send("Internal server error");
  }
};

export default [verifyToken, getAllUsers]; // Apply the verifyToken middleware before getAllUsers
