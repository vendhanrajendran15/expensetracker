import {Request,Response} from "express"
import expense from "../models/expense"
import createExpenseObject from  "../utils/createObjects"
import  repoService from "../repo/repo"
async function addUser(req:Request, res : Response){
    if(!req.body.name){
        res.status(400).json({
            message : "request should have name field"
        })
    }
    const name = req.body.name
    const expense: expense = createExpenseObject(req.body)
    try {
        await repoService.createUser(name,expense)
        res.status(201).json({
            message: `the user ${name} is created`
        })

    }catch (err){
        res.status(400).json({
            message: err
        })
    }

}

async function viewAllExpenses(req: Request, res: Response){
    const name:string = String(req.params.name)
    if(!name){
        res.status(400).json({
            message : "request should have name field"
        })
    }

    try{
     const expenses =await repoService.viewExpense(name) 
     res.status(200).json({
        message: "successfully fetched all the expenses",
        expenses: expenses
     })
    }catch(err){
        res.status(500).json({
            message: err
        })
    }
}
export default {addUser,viewAllExpenses}