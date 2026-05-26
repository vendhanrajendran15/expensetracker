import { Request, Response } from "express"
import expense from "../models/expense"
import createExpenseObject from "../utils/createObjects"
import repoService from "../repo/repo"
async function addUser(req: Request, res: Response) {

    if (!req.body.name) {
        res.status(400).json({
            message: "request should have name field"
        })
    }

    const name = req.body.name
    const expense: expense = createExpenseObject(req.body)
    try {
        await repoService.createUser(name, expense)
        res.status(201).json({
            message: `the user ${name} is created`
        })
        return
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({
                message: err.message
            })
        } else {
            res.status(500).json({
                message: "internal server error"
            })
        }

    }

}

async function viewAllExpenses(req: Request, res: Response) {
    const name: string = String(req.params.name)
    if (!name) {
        res.status(400).json({
            message: "request should have name field"
        })
    }

    try {
        const expenses = await repoService.viewExpense(name)
        
        res.status(200).json({
            message: "successfully fetched all the expenses",
            expenses: expenses
        })
    } catch (err) {
        res.status(500).json({
            message: err instanceof Error ? err.message : "internel server error"
        })
    }
}

async function viewSpecificExpense(req: Request, res: Response) {
    const name = String(req.params.name)
    const type = String(req.params.type)
    if (!name || !type) {
        res.status(400).json({
            message: "request should have all the fields"
        })
        return
    }

    try {
        const response = await repoService.viewExpenseByName(name, type)
        res.status(200).json({
            message: "successfully fetched the expense",
            expense: response
        })
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

async function removeUser(req: Request, res: Response) {
    const name = String(req.params.name)
    if (!name) {
        res.status(400).json({
            message: "request should have the name field"
        })
        return
    }
    try {
        await repoService.deleteUser(name)
        res.status(200).json({
            message: `the user ${name} is deleted`
        })
    } catch (err) {
        res.status(400).json({
            message: err instanceof Error ? err.message : "internal server error"
        })
    }
}

async function removeUserExpense(req: Request, res: Response) {
    const name = String(req.params.name)
    const type = String(req.params.type)
    if (!name || !type) {
        res.status(400).json({
            message: "request should have all the fields"
        })
        return
    }
    try {
        await repoService.deleteUserExpense(name, type)
        res.status(200).json({
            message: "successfully deleted the expense",
        })
    } catch (err) {
        res.status(500).json({
            message: err instanceof Error ? err.message : "internal server error"
        })
    }

}
async function removeUserExpenseType(req: Request, res: Response) {
    const name = String(req.params.name)
    const type = String(req.params.type)
    const value = String(req.params.value)
    if (!name || !type || !value) {
        res.status(400).json({
            message: "request should have all the fields"
        })
        return
    }
    try {
        await repoService.deleteUserExpenseType(name, type, value)
        res.status(200).json({
            message: "successfully deleted the expense value",
        })
    } catch (err) {
        res.status(500).json({
            message: err instanceof Error ? err.message : "internal server error"
        })
    }

}
export default { addUser, viewAllExpenses, viewSpecificExpense, removeUser, removeUserExpense, removeUserExpenseType }