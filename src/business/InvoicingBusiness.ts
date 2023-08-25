import dotenv from 'dotenv'
import { InputGetDatesDTO } from "../dtos/InputGetDates.dto";
import { ValidateDates } from '../services/ValidateDates';
import { InvoicingDatabase } from '../database/InvoicingDatabase';
import { SaleProduct } from '../models/SaleProduct';
import { InvoicingSubGroupBusiness } from './InvoicingSubgroupBusiness';

dotenv.config()

export class InvoicingBusiness {
    constructor(
        private invoicingDatabase: InvoicingDatabase,
        private validateDates: ValidateDates
    ){}

    public getInvoicing = async (input: InputGetDatesDTO): Promise<SaleProduct[]> => {
        
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

        const invoicing: Array<SaleProduct> = (await this.invoicingDatabase.getInvoicing({initialDate: input.initialDate, finalDate: input.finalDate})).map(saleProductDB => {
            return new SaleProduct(
                saleProductDB.venda,
                saleProductDB.nome,
                saleProductDB.dtvenda,
                saleProductDB.fun_nome,
                saleProductDB.produto,
                saleProductDB.descricao,
                saleProductDB.subprod_descricao,
                saleProductDB.qtd,
                saleProductDB.vrunitario,
                saleProductDB.qtd_devolvida,
                saleProductDB.vrcusto_composicao,
                saleProductDB.desconto,
                saleProductDB.total
            )
        })


        return invoicing
        
    }

    private invoicingSubGroup = async () => {
        
        const invoicingProducts = await this.getInvoicing({initialDate: process.env.INITIAL_DATE as string, finalDate: new Date().toISOString()})
        
        const namesSubgroup = await this.invoicingDatabase.getNameSubgroups()

        const listSubgrups = namesSubgroup.map(name => {
            return {
                
            }
        })
        
        return listSubgrups

    }


    public getInvoicingSubGroup = async () => {
        return await this.invoicingSubGroup()
    }
}