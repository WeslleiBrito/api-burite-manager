
export class SaleProduct {
    constructor(
        private sale: number,
        private dateSale: string,
        private seller: string,
        private codeProduct: number,
        private description: string,
        private quantity: number,
        private originalUnitSale: number,
        private returnedQuantity: number,
        private unitCost: number,
        private discount: number,
        private amountSele: number
    ){}

    public getSaleProduct = (): TSaleProduct => {
        return {
            sale: this.sale,
            dateSale: this.dateSale,
            seller: this.seller,
            codeProduct: this.codeProduct,
            description: this.description,
            quantity: this.quantity,
            originalUnitSale: this.originalUnitSale,
            returnedQuantity: this.returnedQuantity,
            unitCost: this.getUnitCost(),
            amountCost: this.getAmountCost(),
            unitSaleValue: this.getUnitSaleValue(),
            discount: this.getDiscount(),
            amountSele: this.getAmountSale()
        }
    }

    public getSale = (): number => {
        return this.sale
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

    public getQuantity = (): number => {
        return this.quantity - this.returnedQuantity
    }

    public getOriginalUnitSale = (): number => {
        return this.originalUnitSale
    }

    public getUnitCost = (): number => {
        return this.getQuantity() ? this.unitCost : 0
    }
    
    public getAmountCost = (): number => {
        return this.getQuantity() ? this.unitCost * this.getQuantity() : 0
    }

    public getUnitSaleValue = (): number => {
        return this.getQuantity() ? this.amountSele / this.getQuantity() : 0
    }

    public getDiscount = (): number => {
        return this.getQuantity() ? (this.discount / this.quantity) * this.getQuantity() : 0
    }

    public getAmountSale = (): number => {
        return this.getQuantity() ? ((this.amountSele / this.quantity)) * this.getQuantity() : 0
    }

}


export type TSaleProduct = {
    sale: number,
    dateSale: string,
    seller: string,
    codeProduct: number,
    description: string,
    quantity: number,
    originalUnitSale: number,
    returnedQuantity: number,
    unitCost: number,
    amountCost: number,
    unitSaleValue: number,
    discount: number,
    amountSele: number
}