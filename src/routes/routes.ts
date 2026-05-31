import { Router } from "express";
import {addUser,viewAllExpenses,viewSpecificExpense,removeUser,removeUserExpense,removeUserExpenseType,putNewExpenseType,putNewExpense,calculateWholeExpense,calculateSpecificExpense,addExistingExpense} from "../controllers/controllers";
const router = Router()

router.post("/createUser",addUser)
router.get("/getExpenses/:name",viewAllExpenses)
router.get("/getExpenses/:name/:type",viewSpecificExpense)
router.delete("/deleteData/:name",removeUser)
router.delete("/deleteData/:name/:type",removeUserExpense)
router.delete("/deleteData/:name/:type/:value",removeUserExpenseType)
router.put("/putExpenses/:name/:type",putNewExpenseType)
router.put("/putExpenses/:name",putNewExpense)
router.get("/getExpensesTotal/:name",calculateWholeExpense)
router.get("/getExpensesTotal/:name/:type",calculateSpecificExpense)
router.put("/addExpense/:name/:type",addExistingExpense)
export default router