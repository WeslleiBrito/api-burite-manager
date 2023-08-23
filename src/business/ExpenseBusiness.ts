import dotenv from 'dotenv'
import { InputGetExpenseDTO } from "../dtos/InputGetExpense.dto";
import { ExpenseDatabase } from '../database/ExpenseDatabase';
import { ValidateDates } from '../services/ValidateDates';

dotenv.config()
export class ExpenseBusiness {
    constructor(
        private databeseExepense: ExpenseDatabase,
        private validateDates: ValidateDates
    ){}

    public getExpense = async (input: InputGetExpenseDTO): Promise<{fixed: number, variable: number}> => {
        
        if(input.initialDate){

            this.validateDates.validate({path: "initialDate", dateString: input.initialDate})

        }else{

            input.initialDate = process.env.INITIAL_DATE as string
        }
        
        
        if(input.finalDate){

            this.validateDates.validate({path: "finalDate", dateString: input.finalDate})

        }else{
            input.finalDate = new Date().toISOString()
        }

        const expenses = await this.databeseExepense.getExpense({initialDate: input.initialDate, finalDate: input.finalDate})

        let fixedAmount: number = 0
        let variableAmount: number = 0

        expenses.fixed.forEach(value => fixedAmount += value.vlrparcela)
        expenses.variable.forEach(value => variableAmount += value.vlrparcela)

        return {
            fixed: Math.ceil(fixedAmount) ,
            variable: Math.ceil(variableAmount)
        }
    }
}