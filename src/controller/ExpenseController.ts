import { Request, Response } from "express";
import { ZodError } from "zod";
import { InputGetExpenseSchema } from "../dtos/InputGetExpense.dto";
import { ExpenseBusiness } from "../business/ExpenseBusiness";
import { DateInvalidError } from "../errors/DateInvalidError";

export class ExpenseController {

    constructor(
        private dateBusiness: ExpenseBusiness
    ){}

    public getExpense = async (req: Request, res: Response) => {
        
        try {
            const input = InputGetExpenseSchema.parse(
                {
                    initialDate: req.body.initialDate,
                    finalDate: req.body.finalDate
                }
            )
            const expense = await this.dateBusiness.getExpense(input)

            res.status(200).send(
                expense
            )

        } catch (error) {

            if(error instanceof ZodError){             
                res.status(400).send(error.issues)
            } else if(error instanceof DateInvalidError) {
                res.status(400).send(error.description)
            }else {
                res.send("Erro inesperado\n " + error)
            }
        }
    }
}