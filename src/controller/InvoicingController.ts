import { Request, Response } from "express";
import { ZodError } from "zod";
import { InputGetDatesSchema } from "../dtos/InputGetDates.dto";
import { DateInvalidError } from "../errors/DateInvalidError";
import { InvoicingBusiness } from "../business/InvoicingBusiness";

export class InvoicingController {

    constructor(
        private invoicingBusiness: InvoicingBusiness
    ){}

    public getInvoicingProducts = async (req: Request, res: Response) => {
        
        try {
            const input = InputGetDatesSchema.parse(
                {
                    initialDate: req.body.initialDate,
                    finalDate: req.body.finalDate
                }
            )
            const invoicingProducts = await this.invoicingBusiness.getInvoicingSubGroup()

            res.status(200).send(
                invoicingProducts
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

    public getInvoicingSubgroup = async (req: Request, res: Response) => {
        
        try {
            const input = InputGetDatesSchema.parse(
                {
                    initialDate: req.body.initialDate,
                    finalDate: req.body.finalDate
                }
            )

            const invoicingSubgroup = await this.invoicingBusiness.getInvoicing(input)
            
            res.status(200).send(
                invoicingSubgroup
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
