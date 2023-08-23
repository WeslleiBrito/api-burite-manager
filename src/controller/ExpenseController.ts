import { Request, Response } from "express";
import { ZodError } from "zod";
import { InputGetDatesSchema } from "../dtos/InputGetDates.dto";
import { ExpenseBusiness } from "../business/ExpenseBusiness";
import { DateInvalidError } from "../errors/DateInvalidError";

export class ExpenseController {

    constructor(
        private expenseBusiness: ExpenseBusiness
    ){}

    public getExpense = async (req: Request, res: Response) => {
        
        try {
            const input = InputGetDatesSchema.parse(
                {
                    initialDate: req.body.initialDate,
                    finalDate: req.body.finalDate
                }
            )
            const expense = await this.expenseBusiness.getExpense(input)

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