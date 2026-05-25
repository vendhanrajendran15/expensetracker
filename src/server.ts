import express from "express"
import  dbConnection from "./configs/dbConfig"
import router from "./routes/routes"
import db from "./repo/repo"

async function main(){

await dbConnection.createTables()

const app= express()

app.use(express.json())

app.use("",router)

// db.viewExpenseByName("dhuruvam","Food")
app.listen(3000,()=>{
    console.log("server started at the port : 3000")
})
}

main()

