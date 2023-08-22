


export class DateInvalidError {
    constructor(
        public description: modelErrorDate
    ){
    }
}

type modelErrorDate = Array<
    {
        validation: string,
        code: string,
        message?: string,
        path: Array<String>

    }
>