

export abstract class BaseErrorZod{
    constructor(
      public description: modelErrorDate
    ){}
}

export type modelErrorDate = Array<
    {
        validation: string,
        code: string,
        message?: string,
        path: Array<String>

    }
>