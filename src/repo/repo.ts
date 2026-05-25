
import  db from "../configs/dbConfig"
import expense from "../models/expense"
import  {DeleteCommand, PutCommand,QueryCommand} from "@aws-sdk/lib-dynamodb"
import { ScanCommand }
from "@aws-sdk/lib-dynamodb"
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

async function viewExpense(userName : string) : Promise<expense | undefined> {
   const queryCmd = new QueryCommand({
    TableName : "expense",
    KeyConditionExpression : "#col= :value",
    ExpressionAttributeNames: {
        "#col" : "name"
    },
    ExpressionAttributeValues:{
        ":value": userName
    } 
})
   try{
    const response = await db.dynamoClient.send(queryCmd)
    if(response.Count === 0){
        throw new Error("No user found")
    }
     return response.Items?.[0] as expense
     }catch(err){
        throw err
    }
}

async function viewExpenseByName(userName : string , expenseType: string):Promise<Record<string,number> | undefined>{
    const queryCmd = new QueryCommand({
        TableName :"expense",
        KeyConditionExpression : "#n = :username",
        ProjectionExpression : "expense.#expensetype",
        ExpressionAttributeNames : {
            "#n": "name",
            "#expensetype": expenseType
        },
        ExpressionAttributeValues :{
            ":username": userName
        }
    })
    try {
        const response = await db.dynamoClient.send(queryCmd)
        return response?.Items?.[0].expense?.[expenseType]
    }catch(err){
        throw new Error(`unable to fetch the data ${err}`)
    }
}

async function deleteUser(userName : string) : Promise<void> {
    const deleteCmd = new DeleteCommand({
        TableName : "expense",
        Key : {
            "name" : userName
        }

    })
    try {
         await db.dynamoClient.send(deleteCmd)
    }catch(err){
        throw new Error("unable to delete the user")
    }
}

export default {viewExpense,createUser,viewExpenseByName,deleteUser}