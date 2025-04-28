import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";
import { setCookies } from "../utils/setCokkie.js";

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(401).json({ message: "User already exists" });
    }

    // In your signup function, before creating the user:
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // authenticate
    const token = generateToken(newUser._id.toString());

    setCookies(res, token);

    res.status(201).json({
      user: {
        _id: newUser._id,
        name: newUser.username,
        email: newUser.email,
      },
      message: "Account created successfully",
    });
  } catch (error) {
    console.log("Error in signup:", error);
    res.status(500).json({ message: "Internal server error: " + error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = generateToken(user._id.toString());

    setCookies(res, token);
    res.status(200).json({
      user: {
        _id: user._id,
        name: user.username,
        email: user.email,
      },
      message: "Logged in successfully",
    });
  } catch (error) {
    console.log("Error in login:", error);
    res.status(500).json({ message: "Internal server error: " + error });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.peertopeer_token;
    if (!refreshToken) {
      return res.status(401).json({ message: "Unauthorized user" });
    }
    res.clearCookie("peertopeer_token");
    res.status(200).json({ message: "Logged out successful" });
  } catch (error) {
    console.log("Error in logout:", error);
    res.status(500).json({ message: "Internal server error: " + error });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    res.status(200).json({ user });
  } catch (error) {
    console.log("Error in getting profile:", error);
    res.status(500).json({ message: "Internal server error: " + error });
  }
};
