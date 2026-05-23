import { DynamoDBClient}  from "@aws-sdk/client-dynamodb"
import { CreateTableCommand, ListTablesCommand } from "@aws-sdk/client-dynamodb"
const dynamodb = new DynamoDBClient({
    region: "local",
    endpoint:"http://localhost:8000",
    credentials: {
        accessKeyId:"local",
        secretAccessKey:"local"
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
        const existingTables = await dynamodb.send(listTablecmd)
        if(!existingTables.TableNames?.includes("expense")){
             await dynamodb.send(createcmd)
             console.log("expense table created")
        }
        
    }catch(err){
        console.log(err)
    }
     
}

async function createTables() {
    await createExpenseTable()
}
export default createTables