import express from 'express';
import { login, logout, register, update } from '../controllers/userController.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update", auth, update);
router.get("/logout", auth, logout);

export default router;