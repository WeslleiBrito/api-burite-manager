import dotenv from 'dotenv'
import { InputGetDatesDTO } from "../dtos/InputGetDates.dto";
import { ValidateDates } from '../services/ValidateDates';
import { InvoicingDatabase } from '../database/InvoicingDatabase';
import { SaleProduct } from '../models/SaleProduct';
import { ExpenseDatabase } from '../database/ExpenseDatabase';


dotenv.config()

export const roundNumber = (decimalPlaces: number, numberValue: number): number => {
    const fatctor = Math.pow(10, decimalPlaces)
    return Math.round(numberValue * fatctor) / fatctor
}

export class InvoicingBusiness {
    constructor(
        private invoicingDatabase: InvoicingDatabase,
        private expenseDatabase: ExpenseDatabase,
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

        const fixedSubgroup = await this.getExepenseFixedSubgroup()
        const invoicing = (await this.invoicingDatabase.getInvoicing({initialDate: input.initialDate, finalDate: input.finalDate})).map(saleProductDB => {
           
            const quantity = saleProductDB.qtd - saleProductDB.qtd_devolvida
            const unitCost = quantity ? saleProductDB.vrcusto_composicao : 0
            const unitSaleValue = quantity ? (saleProductDB.total / quantity) : 0
            const discount = quantity ? (saleProductDB.desconto / saleProductDB.qtd) * quantity : 0
            const amountCost = quantity ? unitCost * quantity : 0
            const amountSele = quantity ? unitSaleValue * quantity : 0

            const fixedExpense = roundNumber(2, fixedSubgroup[saleProductDB.subprod_descricao].fixedExpense * quantity)

           
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
                fixedExpense
            )
        
        })   

        return invoicing
    }
  

    public getExepenseFixedSubgroup = async () => {
        
            const invoicing = (await this.invoicingDatabase.getFixedSubroup()).map(product => {
                const quantity = product.qtd - product.qtd_devolvida
                const unitSaleValue = quantity ? (product.total / quantity) : 0
                const discount = quantity ? (product.desconto / product.qtd) * quantity : 0
                const amountSele = quantity ? unitSaleValue * quantity : 0

                return  {
                    code: product.subprod_cod,
                    subGroup: product.subprod_descricao,
                    quantity,
                    returnedQuantity: product.qtd_devolvida,
                    discount,
                    unitSaleValue,
                    amountSele,
                }
                
            })

        const fixedTotal = (await this.expenseDatabase.getExpense({initialDate: process.env.INITIAL_DATE as string, finalDate: new Date().toISOString()})).fixed.reduce((amout, expense) => amout + expense.vlrparcela, 0)
        const invoicingTotal = invoicing.reduce((amount, product) => amount + product.amountSele, 0)
       
        
        const fixedSubgroup: {[key: string]: {invoicing: number, quantity: number, discount: number, fixedExpense: number, code: number}} = {}

       invoicing.forEach((product) => {
            if(!fixedSubgroup[product.subGroup]){

                const filterSubgroup = invoicing.filter(productFind => productFind.subGroup === product.subGroup)
                
                const invoicingSubgroup = filterSubgroup.reduce((amount, prod) => amount + prod.amountSele, 0)
                const quantity =  filterSubgroup.reduce((amount, prod) => amount + prod.quantity, 0)
                const discount = filterSubgroup.reduce((amount, prod) => amount + prod.discount, 0)

                fixedSubgroup[product.subGroup] = {
                    code: product.code,
                    invoicing: invoicingSubgroup,
                    quantity,
                    discount,
                    fixedExpense: ((invoicingSubgroup / invoicingTotal) * fixedTotal) / quantity
                }
            }
        })
        
        console.log(fixedSubgroup);
        
        return fixedSubgroup
    }
    
}
