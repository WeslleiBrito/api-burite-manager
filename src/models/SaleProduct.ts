
export class SaleProduct {
    constructor(
        private sale: number,
        private client: string,
        private dateSale: string,
        private seller: string,
        private codeProduct: number,
        private description: string,
        private subGroup: string,
        private quantity: number,
        private originalUnitSale: number,
        private returnedQuantity: number,
        private unitCost: number,
        private amountCost: number,
        private discount: number,
        private unitSaleValue: number,
        private amountSele: number,
        private expenseFixed: number,
    ){}

    public getSaleProduct = (): TSaleProduct => {
        return {
            sale: this.sale,
            client: this.client,
            dateSale: this.dateSale,
            seller: this.seller,
            codeProduct: this.codeProduct,
            description: this.description,
            subGroup: this.subGroup,
            quantity: this.quantity,
            originalUnitSale: this.originalUnitSale,
            returnedQuantity: this.returnedQuantity,
            unitCost: this.unitCost,
            amountCost: this.amountCost,
            unitSaleValue: this.unitSaleValue,
            discount: this.discount,
            amountSele: this.amountSele,
            expenseFixed: this.expenseFixed

        }
    }

    public getSale = (): number => {
        return this.sale
    }

    public getClient = (): string => {
        return this.client
    }

    public getDateSale = (): string => {
        return this.dateSale
    }

    public getSeller = (): string => {
        return this.seller
    }

    public getCodeProduct = (): number => {
        return this.codeProduct
    }

    public getDescription = (): string => {
        return this.description
    }

    public getSubGroup = (): string => {
        return this.subGroup
    }

    public getQuantity = (): number => {
        return this.quantity
    }

    public getOriginalUnitSale = (): number => {
        return this.originalUnitSale
    }

    public getReturnedQuantity = (): number => {
        return this.returnedQuantity
    }
    
    public getUnitCost = (): number => {
        return this.unitCost
    }
    
    public getAmountCost = (): number => {
        return this.unitCost
    }

    public getUnitSaleValue = (): number => {
        return this.amountSele
    }

    public getDiscount = (): number => {
        return this.discount
    }

    public getAmountSale = (): number => {
        return this.amountSele
    }
    public getExpenseFixed = (): number => {
        return this.expenseFixed
    }

}


export type TSaleProduct = {
    sale: number,
    client: string,
    dateSale: string,
    seller: string,
    codeProduct: number,
    description: string,
    subGroup: string,
    quantity: number,
    originalUnitSale: number,
    returnedQuantity: number,
    unitCost: number,
    amountCost: number,
    unitSaleValue: number,
    discount: number,
    amountSele: number,
    expenseFixed: number
}