import express from "express"
import  dbConnection from "./configs/dbConfig"
import router from "./routes/routes"


async function main(){

await dbConnection.dbSetup()

const app= express()

app.use(express.json())

app.use("",router)


app.listen(3000,()=>{
    console.log("server started at the port : 3000")
})
}

main()

