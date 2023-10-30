import express from "express";
import {getMyProfile, login, logout, registor} from "../controllers/user.js"
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router()

router.post("/new",registor)

router.post("/login",login)

router.get("/logout",isAuthenticated, logout);
router.get("/me",isAuthenticated, getMyProfile);




export default router;