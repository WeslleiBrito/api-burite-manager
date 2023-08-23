import { isValid, parseISO } from 'date-fns';
import { DateInvalidError } from '../errors/DateInvalidError'

export class ValidateDates {

    public validate = (input: InputValidateDates): void => {

        const date = parseISO(input.dateString)

        const isDateValid = isValid(date)

        if(!isDateValid){
            
            throw new DateInvalidError(
                [
                    {
                        validation: "date",
                        code: "invalid_date",
                        message: "A data informada é inválida.",
                        path: [
                            input.path
                        ]
                    }
                ]
            )
        }

    }
}


interface InputValidateDates {
    path: string,
    dateString: string
}