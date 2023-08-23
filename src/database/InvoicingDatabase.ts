import { InputGetDatesDTO } from "../dtos/InputGetDates.dto";
import { BaseDatabase } from "./BaseDatabase";


export class InvoicingDatabase {

    constructor(
        private baseDatabase: BaseDatabase
    ){}
    
    public getInvoicing = async (input: InputGetDatesDTO) => {
        
        const {initialDate, finalDate} = input

        const invoicing = await this.baseDatabase.connection("venda_item")
        .whereBetween("venda_item.dtvenda", [initialDate, finalDate])
        .innerJoin("venda", "venda_item.venda", "venda.vend_cod")

        return invoicing
    }
}

