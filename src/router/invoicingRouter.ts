import express from "express"
import { BaseDatabase } from "../database/BaseDatabase"
import { ValidateDates } from "../services/ValidateDates"
import { InvoicingController } from "../controller/InvoicingController"
import { InvoicingBusiness } from "../business/InvoicingBusiness"
import { InvoicingDatabase } from "../database/InvoicingDatabase"

export const invoicingRouter = express.Router()

const invoicingController = new InvoicingController(
    new InvoicingBusiness(
        new InvoicingDatabase(new BaseDatabase()),
        new ValidateDates()
    )
)

invoicingRouter.get('/products', invoicingController.getInvoicingProducts) 
invoicingRouter.get('/subgroup', invoicingController.getInvoicingSubgroup) 