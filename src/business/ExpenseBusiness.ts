import dotenv from 'dotenv'
import { InputGetExpenseDTO } from "../dtos/InputGetExpense.dto";
import z from 'zod'
import { DateInvalidError } from '../errors/DateInvalidError';
import { ExpenseDatabase } from '../database/ExpenseDatabase';

dotenv.config()
export class ExpenseBusiness {
    constructor(
        private databeseExepense: ExpenseDatabase
    ){}

    public getExpense = async (input: InputGetExpenseDTO): Promise<{fixed: number, variable: number}> => {
        
        const newInput = {
            initialDate: process.env.INITIAL_DATE as string,
            finalDate: new Date().toISOString().slice(0, 10)
        }

        if(input.initialDate){

            if(!z.coerce.date().safeParse(input.initialDate).success){
                throw new DateInvalidError(
                    [
                        {
                            validation: "date",
                            code: "invalid_date",
                            message: "A data informada é inválida.",
                            path: [
                                "initialDate"
                            ]
                        }
                    ]
                )
            }

            newInput.initialDate = input.initialDate

        }

        if(input.finalDate){

            if(!z.coerce.date().safeParse(input.finalDate).success){
                throw new DateInvalidError(
                    [
                        {
                            validation: "date",
                            code: "invalid_date",
                            message: "A data informada é inválida.",
                            path: [
                                "finalDate"
                            ]
                        }
                    ]
                )
            }

            newInput.finalDate = input.finalDate
        }

        const expenses = await this.databeseExepense.getExpense({initialDate: newInput.initialDate, finalDate: newInput.finalDate})

        let fixedAmount: number = 0
        let variableAmount: number = 0

        expenses.fixed.forEach(value => fixedAmount += value.vlrparcela)
        expenses.variable.forEach(value => variableAmount += value.vlrparcela)

        return {
            fixed: fixedAmount,
            variable: variableAmount
        }
    }
}