import { Router } from "express";
import addUser from "../controllers/controllers";
const router = Router()

router.post("/createUser",addUser)

export default router