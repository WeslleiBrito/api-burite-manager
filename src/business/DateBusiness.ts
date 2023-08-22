import dotenv from 'dotenv'
import { InputGetDateDTO } from "../dtos/getDates.dto";
import z from 'zod'
import { DateInvalidError } from '../errors/DateInvalidError';

dotenv.config()
export class DateBusiness {

    public getDateBusiness = async (input: InputGetDateDTO) => {
        
        const newInput = {
            initialDate: process.env.INITIAL_DATE,
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

        return {
            newInput
        }
    }
}