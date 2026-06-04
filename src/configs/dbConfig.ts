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


async function createTables() {
  const createExpenseTableCmd = new CreateTableCommand({
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
  const createUsersTableCmd = new CreateTableCommand({
    TableName: "users",
    AttributeDefinitions: [{
      AttributeName: "Name",
      AttributeType: "S",
    },
    ],
    KeySchema: [{
      AttributeName: "Name",
      KeyType: "HASH"
    },],
    BillingMode: "PAY_PER_REQUEST"

  });
  const listTablecmd = new ListTablesCommand({})
  try {
    const existingTables = await dynamoClient.send(listTablecmd)
    if (!existingTables.TableNames?.includes("expense")) {
      await dynamoClient.send(createExpenseTableCmd)
      console.log("expense table created")
    }
    if (!existingTables.TableNames?.includes("users")) {
      await dynamoClient.send(createUsersTableCmd)
      console.log("user table created")
    }

  } catch (err) {
    console.log(err)
  }

}

async function dbSetup() {
  await createTables()
}
export default { dbSetup, dynamoClient }