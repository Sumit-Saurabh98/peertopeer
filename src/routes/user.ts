import express from "express";
import protectRoute from "../middleware/auth.js";
import { getProfile, login, logout, signup } from "../controllers/user.js";

const router = express.Router();

router.post('/signup', signup as express.RequestHandler);
router.post('/login', login as express.RequestHandler);
router.post('/logout', logout as express.RequestHandler);
router.get("/profile", protectRoute, getProfile as express.RequestHandler);

export default router;