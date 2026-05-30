
import expense from "../models/expense";

function createExpenseObject(body : any ) : expense {


   const expenseObject: expense = body.expense

 return expenseObject
    
      
}



export default createExpenseObject