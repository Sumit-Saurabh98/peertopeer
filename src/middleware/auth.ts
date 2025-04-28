import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.peertopeer_token;

    if (!token) {
      res
        .status(401)
        .json({ message: "Unauthorized - No access token provided" });
      return;
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.PEERTOPEER_TOKEN_SECRET!
      ) as jwt.JwtPayload;
      const user = await User.findById(decoded._id).select("-password");

      if (!user) {
        res.status(401).json({ message: "User not found" });
        return;
      }

      req.user = user;

      next();
    } catch (error) {
      console.log("Error in auth middleware :- ", error);

      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({
          success: false,
          message: "Unauthorized - invalid token provided",
        });
      } else {
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
      return;
    }
  } catch (error) {
    console.log("Error in auth middleware :- ", error);

    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        success: false,
        message: "Unauthorized - invalid token provided",
      });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    return;
  }
};

export default protectRoute;