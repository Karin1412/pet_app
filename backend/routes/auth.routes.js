import express from "express"
import { signout, signup, login } from "../controllers/auth.controller.js"

const router = express.Router();

router.post("/signup", signup)

router.post("/signout", signout)

router.post("/login", login)

export default router