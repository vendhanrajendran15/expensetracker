import express from "express"
import  createTables from "./configs/dbConfig"



async function main(){
await createTables()
const app= express()
}

main()

