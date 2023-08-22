import { BaseDatabase } from "./BaseDatabase";


export class TotalExpensesDatabase {
    constructor(
        private baseDatabase: BaseDatabase
    ){}

    public getTotalFixedExpense = async (input: {initialDate: string , finalDate: string}) => {

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
        
        let amoutFixed: number = 0

        fixed.forEach(expense => amoutFixed += expense.vlrparcela)

        return amoutFixed

    }
}