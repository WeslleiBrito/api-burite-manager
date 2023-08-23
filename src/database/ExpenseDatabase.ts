import { BaseDatabase } from "./BaseDatabase";


export class ExpenseDatabase {
    constructor(
        private baseDatabase: BaseDatabase
    ){}

    public getExpense = async (input: {initialDate: string , finalDate: string}): Promise<{fixed: Array<{vlrparcela: number}>, variable: Array<{vlrparcela: number}>}> => {

        const {initialDate , finalDate} = input

        const fixed: Array<{vlrparcela: number}> = await this.baseDatabase.connection("tipoconta")
        .select("pagar_rateio.rateio_vlrparcela as vlrparcela")
        .innerJoin(
            "pagar_rateio",
            "pagar_rateio.rateio_tipoconta",
            "tipoconta.tipocont_cod"
        )
        .whereBetween("pagar_rateio.rateio_dtvencimento", [initialDate, finalDate])
        .andWhere("tipoconta.conta_fixa", 1)
        
        const variable: Array<{vlrparcela: number}> = await this.baseDatabase.connection("tipoconta")
        .select("pagar_rateio.rateio_vlrparcela as vlrparcela")
        .innerJoin(
            "pagar_rateio",
            "pagar_rateio.rateio_tipoconta",
            "tipoconta.tipocont_cod"
        )
        .whereBetween("pagar_rateio.rateio_dtvencimento", [initialDate, finalDate])
        .andWhere("tipoconta.conta_fixa", 0)
        .whereNotIn("tipoconta.tipocont_cod", [75, 79])

        return {
            fixed,
            variable
        }

    }
}

