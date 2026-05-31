
import { json } from "express"
import  db from "../configs/dbConfig"
import expense from "../models/expense"
import  {DeleteCommand, PutCommand,QueryCommand, UpdateCommand} from "@aws-sdk/lib-dynamodb"
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
    ProjectionExpression : "expense",
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
        },
         ReturnValues: "ALL_OLD"
    })
    try {
         const response = await db.dynamoClient.send(deleteCmd)
         if (response.Attributes === undefined){
             throw new Error("unable to find the user")
         }
    }catch(err){
        if (err instanceof Error) {
             throw err
        }
        throw new Error("unable to delete the user")
    }
}

async function deleteUserExpense(userName : string , type : string): Promise<void>{
  const deleteCmd = new UpdateCommand({
    TableName: "expense",
    Key:{
        "name":userName
    },
    UpdateExpression :
        "REMOVE expense.#type"
    ,
    ExpressionAttributeNames :{
        "#type": type
    },
     ReturnValues: "ALL_NEW"
  })
  try{
   const response = await db.dynamoClient.send(deleteCmd)
   
     if (response.Attributes === undefined){
             throw new Error("unable to find the user expense type")
         }
  }catch(err){
     if (err instanceof Error) {
             throw err
        }
    throw new Error("unable to delete the expense type")
  }
}
async function deleteUserExpenseType(userName : string , type : string,value : string): Promise<void>{
  const deleteCmd = new UpdateCommand({
    TableName: "expense",
    Key:{
        "name":userName
    },
    UpdateExpression :
        "REMOVE expense.#type.#value"
    ,
    ExpressionAttributeNames :{
        "#type": type,
        "#value": value
    },
     ReturnValues: "ALL_NEW"
  })
  try{
   const response = await db.dynamoClient.send(deleteCmd)
    if (response.Attributes === undefined){
             throw new Error("unable to find the user expense type value")
         }
  }catch(err){
    if (err instanceof Error) {
             throw err
        }
    throw new Error("unable to delete the expense type value")
  }
}

async function updateExpenseType( userName: string , type : string , reason : string , cost : number){
    const updateCmd = new UpdateCommand({
        TableName : "expense",
        Key : {"name" : userName},
        UpdateExpression :
            "SET expense.#type.#key = :value",
        ExpressionAttributeNames : {
            "#type": type,
            "#key" : reason
        },
        ExpressionAttributeValues : {
            ":value": cost
        },
        ConditionExpression:
      "attribute_exists(expense.#type)",
        ReturnValues : "ALL_NEW"
    })

    try {
        const response = await db.dynamoClient.send(updateCmd)
        if(response.$metadata.httpStatusCode !== 200){
            throw new Error("Invalid values")
        }
    }catch(err){
        if( err instanceof Error) {
              throw err
        }
        throw new Error(" Internel server error")
    }

}
async function updateExpense( userName: string , type : string ,obj : any){
  
    const updateCmd = new UpdateCommand({
        TableName : "expense",
        Key : {"name" : userName},
        UpdateExpression :
            "SET expense.#type = :value",
        ExpressionAttributeNames : {
            "#type": type
        },
        ExpressionAttributeValues : {
            ":value": obj
        },
      
        ReturnValues : "ALL_NEW"
    })

    try {
        const response = await db.dynamoClient.send(updateCmd)
     
        if(response.$metadata.httpStatusCode !== 200){
            throw new Error("user not found")
        }
    }catch(err){
        if( err instanceof Error) {
              throw err
        }
        throw new Error(" Internel server error")
    }

}

async function addExpense(userName: string , type : string , reason : string , cost : number){
  const updateCmd = new UpdateCommand({
    TableName: "expense",
    Key: { name: userName },

    UpdateExpression:
        "SET expense.#type.#key = if_not_exists(expense.#type.#key, :zero) + :cost",

    ExpressionAttributeNames: {
        "#type": type,
        "#key": reason
    },

    ExpressionAttributeValues: {
        ":cost": cost,
        ":zero": 0
    },

    ReturnValues: "ALL_NEW"
})

    try{
         const response=await db.dynamoClient.send(updateCmd)
    }catch(err){
           if( err instanceof Error) {
              throw err
        }
        throw new Error(" Internel server error")
    }
}
export default {viewExpense,createUser,viewExpenseByName,deleteUser,deleteUserExpense,deleteUserExpenseType,updateExpenseType,updateExpense,addExpense}
