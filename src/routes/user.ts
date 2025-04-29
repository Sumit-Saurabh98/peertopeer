import express from "express";
import protectRoute from "../middleware/auth.js";
import { getAllUsers, getProfile, login, logout, signup } from "../controllers/user.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/users', protectRoute, getAllUsers);
router.get("/profile", protectRoute, getProfile);

export default router;