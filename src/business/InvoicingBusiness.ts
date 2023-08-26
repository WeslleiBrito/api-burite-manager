import dotenv from 'dotenv'
import { InputGetDatesDTO } from "../dtos/InputGetDates.dto";
import { ValidateDates } from '../services/ValidateDates';
import { InvoicingDatabase } from '../database/InvoicingDatabase';
import { SaleProduct } from '../models/SaleProduct';
import { ExpenseBusiness } from './ExpenseBusiness';

dotenv.config()

export class InvoicingBusiness {
    constructor(
        private invoicingDatabase: InvoicingDatabase,
        private validateDates: ValidateDates,
        private expenseValue: ExpenseBusiness
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
      
        const fixedSubgroup = await this.getInvoicingSubGroup()

        const invoicing: Array<SaleProduct> = (await this.invoicingDatabase.getInvoicing({initialDate: input.initialDate, finalDate: input.finalDate})).map(saleProductDB => {
           
            const quantity = saleProductDB.qtd - saleProductDB.qtd_devolvida
            const unitCost = quantity ? saleProductDB.vrcusto_composicao : 0
            const unitSaleValue = quantity ? (saleProductDB.total / saleProductDB.qtd) * quantity : 0
            const discount = quantity ? (saleProductDB.desconto / saleProductDB.qtd) * quantity : 0
            const amountCost = quantity ? unitCost * quantity : 0
            const amountSele = quantity ? unitSaleValue * quantity : 0

            return new SaleProduct(
                saleProductDB.venda,
                saleProductDB.nome,
                saleProductDB.dtvenda,
                saleProductDB.fun_nome,
                saleProductDB.produto,
                saleProductDB.descricao,
                saleProductDB.subprod_descricao,
                quantity,
                saleProductDB.vrunitario,
                saleProductDB.qtd_devolvida,
                unitCost,
                amountCost,
                discount,
                unitSaleValue,
                amountSele,
                fixedSubgroup[saleProductDB.subprod_descricao].fixedExpense
            )
        })


        return invoicing
        
    }

    private invoicingSubGroup = async () => {
        
        const invoicingProducts = await this.getInvoicing({initialDate: process.env.INITIAL_DATE as string, finalDate: new Date().toISOString()})
        const namesSubgroup = await this.invoicingDatabase.getNameSubgroups()
        const fixedExpense = (await this.expenseValue.getExpense({initialDate: process.env.INITIAL_DATE as string, finalDate: new Date().toISOString()})).fixed
        const invoicingAmount = invoicingProducts.reduce((amount, product) => (product.getUnitSaleValue() * product.getQuantity()) + amount, 0)
    
        const dataSubgroup : { [key: string]: DataSubGroup } = {}

      namesSubgroup.forEach(name => {
            const products = invoicingProducts.filter(product => product.getSubGroup() === name)
            
            const invoicing = products.reduce((amount, products) => (products.getUnitSaleValue() * products.getQuantity()) + amount, 0)
            const cost = products.reduce((amount, products) => products.getAmountCost() + amount, 0)
            const quantity = products.reduce((amount, products) => products.getQuantity() + amount, 0)
            const discount = products.reduce((amount, products) => products.getDiscount() + amount, 0)
            const fixedExpenseSubGroup = ((invoicing / invoicingAmount) * fixedExpense) / quantity

            dataSubgroup[name] = {
                    invoicing,
                    cost,
                    quantity,
                    discount,
                    fixedExpense: fixedExpenseSubGroup
            }
        })
        
        return dataSubgroup

    }


    public getInvoicingSubGroup = async () => {
        return await this.invoicingSubGroup()
    }
}

export interface DataSubGroup {
    invoicing: number,
    cost: number,
    quantity: number,
    discount: number,
    fixedExpense: number
}