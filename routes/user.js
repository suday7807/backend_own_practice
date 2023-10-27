import express from "express";

import { login,registor,getUserDetails } from "../controllers/users.js";


const router = express.Router();





router.post("/login",login)

router.post("/new",registor)

router.route("/userid/:id").get(getUserDetails)



export default router