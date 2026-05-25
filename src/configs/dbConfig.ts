import {
  DynamoDBClient,
  CreateTableCommand,
  ListTablesCommand
}
from "@aws-sdk/client-dynamodb"

import {
  DynamoDBDocumentClient
}
from "@aws-sdk/lib-dynamodb"

const client = new DynamoDBClient({

  region: "local",

  endpoint: "http://localhost:8000",

  credentials: {
    accessKeyId: "local",
    secretAccessKey: "local"
  }
})

const dynamoClient =
  DynamoDBDocumentClient.from(client, {

    marshallOptions: {
      removeUndefinedValues: true
    }
  })


async function createExpenseTable() {
    const createcmd = new CreateTableCommand({
        TableName: "expense",
        AttributeDefinitions: [{
            AttributeName: "name",
            AttributeType: "S",
        }
        ],
        KeySchema: [{
            AttributeName: "name",
            KeyType: "HASH"
        }],
        BillingMode: "PAY_PER_REQUEST"

    });
    const listTablecmd = new ListTablesCommand({})
    try {
        const existingTables = await dynamoClient.send(listTablecmd)
        if(!existingTables.TableNames?.includes("expense")){
             await dynamoClient.send(createcmd)
             console.log("expense table created")
        }
        
    }catch(err){
        console.log(err)
    }
     
}

async function createTables() {
    await createExpenseTable()
}
export default {createTables,dynamoClient}