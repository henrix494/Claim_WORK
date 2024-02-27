// src/routes/auth.tsimport dotenv from "dotenv";
import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config({
    path: "../.env",
  });
}

import express from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { verifyToken } from "./verifyUser";
import bcrypt from "bcrypt";
const router = express.Router();
const maxAge = 3 * 24 * 60 * 60;
const secret =
  process.env.NODE_ENV === "production"
    ? process.env.JTWsecret
    : process.env.secretDEV;
const url =
  process.env.NODE_ENV === "production"
    ? "https://claim-work.vercel.app/"
    : "http://localhost:5173";
const createToken = (id: any, role: any) => {
  if (secret) {
    return jwt.sign({ id, role }, secret, { expiresIn: maxAge });
  }
};

router.post("/login", async (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", url);
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: "Invalid username or password" });
      return;
    }
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
        const token = createToken(
          user.getDataValue("id"),
          user.getDataValue("role")
        );
        res
          .cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 })
          .status(200);
        res.json("logedn in");
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

router.post("/profile", verifyToken, async (req, res) => {
  try {
    // Set the 'Access-Control-Allow-Origin' header
    await res.setHeader("Access-Control-Allow-Origin", url);

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
    res.status(200).json(userOne);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
