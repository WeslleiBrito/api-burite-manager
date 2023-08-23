import z from 'zod'

export interface InputGetDatesDTO {
    initialDate: string,
    finalDate: string
}

const regexDate = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}\.\d{3}Z)?$/


export const InputGetDatesSchema = z.object(
    {
        
        initialDate: z.string({invalid_type_error: "A data deve ser uma string"}).regex(regexDate, {message: "A data precisa ser nesse formatos AAAA-MM-DD."}).optional(),
        finalDate: z.string({invalid_type_error: "A data deve ser uma string"}).regex(regexDate, {message: "A data precisa ser nesse formatos AAAA-MM-DD."}).optional()
    }
).transform((data) => data as InputGetDatesDTO)
