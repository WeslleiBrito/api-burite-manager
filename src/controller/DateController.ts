import { Request, Response } from "express";
import { ZodError } from "zod";
import { InputGetDateSchema } from "../dtos/getDates.dto";
import { DateBusiness } from "../business/DateBusiness";
import { DateInvalidError } from "../errors/DateInvalidError";

export class DateController {

    constructor(
        private dateBusiness: DateBusiness
    ){}

    public getDate = async (req: Request, res: Response) => {
        
        try {
            const input = InputGetDateSchema.parse(
                {
                    initialDate: req.body.initialDate,
                    finalDate: req.body.finalDate
                }
            )
            const expense = await this.dateBusiness.getDateBusiness(input)

            res.status(200).send(
                {
                    expense
                }
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