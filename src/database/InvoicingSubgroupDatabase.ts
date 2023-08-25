import { InputGetDatesDTO } from "../dtos/InputGetDates.dto";
import { BaseDatabase } from "./BaseDatabase";

export class InvoicingSubgroupDatabase {

    constructor(
        private baseDatabase: BaseDatabase
    ){}

    private productSubgrupo = async () => {
        

        const result = await this.baseDatabase.connection("produto").select("prod_cod", "prod_dsubgrupo")

        return result
    }

    public getProductSubgrupo = async () => {

        return await this.productSubgrupo()
    }
}