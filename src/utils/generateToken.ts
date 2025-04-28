import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const generateToken = (
    _id: string
  ): string => {
  
    const token = jwt.sign({ _id }, process.env.PEERTOPEER_TOKEN_SECRET!, {
      expiresIn: "7d",
    });
  
    return token;
  };
  
  export default generateToken;