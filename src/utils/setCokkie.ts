import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { Response } from "express";

export const setCookies = (
  res: Response,
  accessToken: string
): void => {
  res.cookie("peertopeer_token", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 15 * 60 * 1000,
  });
};