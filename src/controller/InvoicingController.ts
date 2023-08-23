import { Request, Response } from "express";
import { ZodError } from "zod";
import { InputGetDatesSchema } from "../dtos/InputGetDates.dto";
import { DateInvalidError } from "../errors/DateInvalidError";
import { InvoicingBusiness } from "../business/InvoicingBusiness";

export class InvoicingController {

    constructor(
        private invoicingBusiness: InvoicingBusiness
    ){}

    public getExpense = async (req: Request, res: Response) => {
        
        try {
            const input = InputGetDatesSchema.parse(
                {
                    initialDate: req.body.initialDate,
                    finalDate: req.body.finalDate
                }
            )
            const invoicing = await this.invoicingBusiness.getInvoicing(input)

            res.status(200).send(
                invoicing
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
