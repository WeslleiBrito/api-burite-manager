import dotenv from 'dotenv'
import { InputGetDatesDTO } from "../dtos/InputGetDates.dto";
import { ValidateDates } from '../services/ValidateDates';
import { InvoicingDatabase } from '../database/InvoicingDatabase';
import { SaleProduct } from '../models/SaleProduct';

dotenv.config()

export class InvoicingBusiness {
    constructor(
        private invoicingBusiness: InvoicingDatabase,
        private validateDates: ValidateDates
    ){}

    public getInvoicing = async (input: InputGetDatesDTO) => {
        
        if(input.initialDate){

            this.validateDates.validate({path: "initialDate", dateString: input.initialDate})

        }else{

            input.initialDate = process.env.INITIAL_DATE as string
        }
        
        
        if(input.finalDate){

            this.validateDates.validate({path: "finalDate", dateString: input.finalDate})

        }else{
            input.finalDate = new Date().toISOString()
        }

        const expenses = (await this.invoicingBusiness.getInvoicing({initialDate: input.initialDate, finalDate: input.finalDate})).map(saleProductDB => {
            return new SaleProduct(
                saleProductDB.venda,
                saleProductDB.nome,
                saleProductDB.dtvenda,
                saleProductDB.fun_nome,
                saleProductDB.produto,
                saleProductDB.descricao,
                saleProductDB.qtd,
                saleProductDB.vrunitario,
                saleProductDB.qtd_devolvida,
                saleProductDB.vrcusto_composicao,
                saleProductDB.desconto,
                saleProductDB.total
            ).getSaleProduct()
        })

        return {
            expenses: expenses.slice(0, 5)
        }
    }
}