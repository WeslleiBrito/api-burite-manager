import { InvoicingSubgroupDatabase } from "../database/InvoicingSubgroupDatabase";
import { ValidateDates } from "../services/ValidateDates";

export class InvoicingSubGroupBusiness {
    constructor(
        private invoicingSubgroupDatabase: InvoicingSubgroupDatabase,
        private validateDates: ValidateDates
    ){}
    
    public getProductSubgrupo = async () => {

        return await this.invoicingSubgroupDatabase.getProductSubgrupo()
    }
}