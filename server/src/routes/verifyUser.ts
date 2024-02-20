// src/routes/verifyUser.ts
import dotenv from "dotenv";

dotenv.config({
  path: "../.env",
});
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  // Add other properties if needed
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.body.jwt;

    if (token) {
      const secret =
        process.env.NODE_ENV === "production"
          ? process.env.JTWsecret
          : process.env.secretDEV; // Assign the value of process.env.Token to a variable
      if (secret) {
        // Check if the secret is defined
        jwt.verify(token, secret, (err: any, decodedToken: any) => {
          if (err) {
            res.status(401).json({ message: "Unauthorized" });
          } else {
            req.user = decodedToken as TokenPayload;
            next(); // Proceed to the next middleware
          }
        });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
