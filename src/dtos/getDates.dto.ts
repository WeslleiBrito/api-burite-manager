import z from 'zod'

export interface InputGetDateDTO {
    initialDate?: string,
    finalDate?: string
}

const regexDate = /^(\d{4}-\d{2}-\d{2})$/


export const InputGetDateSchema = z.object(
    {
        
        initialDate: z.string({invalid_type_error: "A data deve ser uma string"}).regex(regexDate, {message: "A data precisa ser nesse formatos AAAA-MM-DD."}).optional(),
        finalDate: z.string({invalid_type_error: "A data deve ser uma string"}).regex(regexDate, {message: "A data precisa ser nesse formatos AAAA-MM-DD."}).optional()
    }
).transform((data) => data as InputGetDateDTO)
