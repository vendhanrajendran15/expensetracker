import { Router } from "express";
import controller from "../controllers/controllers";
const router = Router()

router.post("/createUser",controller.addUser)
router.get("/getExpenses/:name",controller.viewAllExpenses)
router.get("/getExpenses/:name/:type",controller.viewSpecificExpense)
router.delete("/deleteData/:name",controller.removeUser)
router.delete("/deleteData/:name/:type",controller.removeUserExpense)
router.delete("/deleteData/:name/:type/:value",controller.removeUserExpenseType)
export default router