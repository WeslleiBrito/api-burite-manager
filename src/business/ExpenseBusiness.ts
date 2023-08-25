import dotenv from 'dotenv'
import { InputGetDatesDTO } from "../dtos/InputGetDates.dto";
import { ExpenseDatabase } from '../database/ExpenseDatabase';
import { ValidateDates } from '../services/ValidateDates';

dotenv.config()
export class ExpenseBusiness {
    constructor(
        private databeseExepense: ExpenseDatabase,
        private validateDates: ValidateDates
    ){}

    public getExpense = async (input: InputGetDatesDTO): Promise<{fixed: number, variable: number}> => {
        
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

       
        return {
            fixed: Math.ceil(expenses.fixed.reduce((amount, value) => amount + value.vlrparcela, 0)),
            variable: Math.ceil(expenses.variable.reduce((amount, value) => amount + value.vlrparcela, 0))
        }

    }
}