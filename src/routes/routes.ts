import { Router } from "express";
import controller from "../controllers/controllers";
const router = Router()

router.post("/createUser",controller.addUser)
router.get("/getExpenses/:name",controller.viewAllExpenses)
router.get("/getExpenses/:name/:type",controller.viewSpecificExpense)
router.delete("/deleteData/:name",controller.removeUser)
export default router