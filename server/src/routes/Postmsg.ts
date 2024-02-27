import { Request, Response } from "express";
import Msg from "../models/msg";
import { verifyToken } from "./verifyUser";

const postNewMsg = async (req: Request, res: Response) => {
  const { name, message, UserId } = await req.body;

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
  } else if (!name || !message || !UserId || message === "") {
    res.status(400).send("חסרים שדות ");
  } else {
    try {
      const newMsg = await Msg.create({
        name: name,
        message: message,
        UserId: UserId,
      });
      newMsg.save();
      res.status(201).json("הודעה נשלחה");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default [verifyToken, postNewMsg];
