import { Request } from "express";
import { IUser } from "./utils/interfaces.js";

declare global {
	namespace Express {
		interface Request {
			user: IUser
		}
	}
}