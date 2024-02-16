import { Request, Response } from "express";
import Msg from "../models/msg";
import User from "../models/user";
import { verifyToken } from "./verifyUser";

const getAllMSG = async (req: Request, res: Response) => {
  try {
    const msgs = await Msg.findAll({
      include: [
        {
          model: User,
          as: "User",
          attributes: ["id", "username"],
        },
      ],
    });

    res.status(200).json({ data: msgs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default [verifyToken, getAllMSG];
