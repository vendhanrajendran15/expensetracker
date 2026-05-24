import e from "express";
import  db from "../configs/dbConfig"
import expense from "../models/expense"
import  {PutCommand,QueryCommand} from "@aws-sdk/lib-dynamodb"
async function createUser(userName : string ,expenseData : expense) {
    const userItem = {
        name :userName,
        expense : expenseData
    }
    const createUserCmd = new PutCommand({
        TableName: "expense",
        Item: userItem
    })

    try{
     const response = await db.dynamoClient.send(createUserCmd);
    }catch(err){
        throw new Error("failed to create user");
    }
}

async function viewExpense(userName : string) : Promise<expense | null> {
   const queryCmd = new QueryCommand({
    TableName : "expense",
    KeyConditionExpression : "#col= :value",
    ExpressionAttributeNames: {
        "#col" : "name"
    },
    ExpressionAttributeValues:{
        ":value": `${userName}`
    } 
})
   try{
    const response = await db.dynamoClient.send(queryCmd)
     return response.Items?.[0] as expense
     }catch(err){
        throw new Error(`${err}`)
    }
}


export default {viewExpense,createUser}