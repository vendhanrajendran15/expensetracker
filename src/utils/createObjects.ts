
import expense from "../models/expense";

function createExpenseObject(body : any ) : expense {
  const expenseObject : expense = {
    Miscellaneous : body?.Miscellaneous,
    Food : body?.Food,
    Investments : body?.Investments,
    Travel : body?.Travel,
    Responsibilities: body?.Responsibilities
  }
      return expenseObject
    
      
}

export default createExpenseObject