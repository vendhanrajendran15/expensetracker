import { Router } from "express";
import controller from "../controllers/controllers";
const router = Router()

router.post("/createUser",controller.addUser)
router.get("/getexpenses/:name",controller.viewAllExpenses)
export default router