import expense from "../models/expense";

export function calculateExpense(expense : any):number{
 let total=0
  for(const[_,value] of Object.entries(expense)){
    const val = value  as Record<string, Object>
    for(const[_,value2] of Object.entries(val)){
          for(const[_,value3] of Object.entries(value2)){
                   total=total+value3
          }
    }
  }
  return total
}

export function calculateSingleExpense(expense:any) : number{
    
   let total=0
  for(const[_,value] of Object.entries(expense)){
    const val = value  as number
    total=total+val
  }
  return total
}