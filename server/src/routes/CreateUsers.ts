import User from "../models/user";
import { Request, Response } from "express";
import { verifyToken } from "./verifyUser";
import bcrypt from "bcrypt";

const createNewUser = async (req: Request, res: Response) => {
  const { userName, passWord, role } = await req.body;

  if (!userName || !passWord || !role) {
    res.status(400).json("חסרים שדות ");
  } else {
    try {
      res.setHeader("Access-Control-Allow-Origin", "*");
      const user = await User.findOne({ where: { userName: userName } });
      console.log(user);
      if (!user) {
        const hashedPassword = await bcrypt.hash(passWord, 10);
        const newUser = User.create({
          userName: userName,
          passWord: hashedPassword,
          role: role,
        });
        res.status(201).json("משתמש נוצר");
      } else {
        res.status(400).json("משתמש קיים");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default [verifyToken, createNewUser];
