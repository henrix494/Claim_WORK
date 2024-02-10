// src/routes/auth.ts
import express from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { verifyToken } from "./verifyUser";
import bcrypt from "bcrypt";
const router = express.Router();
const maxAge = 3 * 24 * 60 * 60;
const secret = process.env.JTWsecret;
const createToken = (id: any) => {
  if (secret) {
    return jwt.sign({ id }, secret, { expiresIn: maxAge });
  }
};

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        userName: username,
      },
    });

    if (user) {
      const match = await bcrypt.compare(
        password,
        user.getDataValue("passWord")
      );
      if (match) {
        const token = createToken(user.id);
        res.cookie("jwt", token, {
          httpOnly: false,
          maxAge: maxAge * 1000,
          sameSite: "none",
          secure: true,
          domain: ".vercel.app",
        });
        res.status(200).json({ user });
      } else {
        res.status(400).json({ message: "Invalid username or password" });
      }
    } else {
      res.status(400).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
});

router.get("/profile", verifyToken, async (req, res) => {
  try {
    // Access user information from req.user
    const user: any = req.user;

    // Check if user is null or undefined
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }

    const { id } = user;

    const userOne = await User.findOne({
      where: {
        id: id,
      },
    });
    // You can now use the user information as needed
    res.json(userOne);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
