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

export default addUser