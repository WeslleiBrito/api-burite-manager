import { Request, Response } from "express";
import { ZodError } from "zod";
import { InputGetDatesSchema } from "../dtos/InputGetDates.dto";
import { DateInvalidError } from "../errors/DateInvalidError";
import { InvoicingSubGroupBusiness } from "../business/InvoicingSubgroupBusiness";

export class InvoicingSubgroupController {

    constructor(
        private invoicingSubgroupBusiness: InvoicingSubGroupBusiness
    ){}

    public getInvoicingSubgroup = async (req: Request, res: Response) => {
        
        try {
            const input = InputGetDatesSchema.parse(
                {
                    initialDate: req.body.initialDate,
                    finalDate: req.body.finalDate
                }
            )
            const invoicingSubgroup = await this.invoicingSubgroupBusiness.getProductSubgrupo()

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
