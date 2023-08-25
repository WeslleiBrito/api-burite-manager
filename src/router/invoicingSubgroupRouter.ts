import express from "express"
import { InvoicingSubgroupController } from "../controller/InvoicingSubgroupController"
import { InvoicingSubGroupBusiness } from "../business/InvoicingSubgroupBusiness"
import { InvoicingSubgroupDatabase } from "../database/InvoicingSubgroupDatabase"
import { ValidateDates } from "../services/ValidateDates"
import { BaseDatabase } from "../database/BaseDatabase"

export const invoicingSubgroupRouter = express.Router()

const invoicingSubgroupController = new InvoicingSubgroupController(
    new InvoicingSubGroupBusiness(
        new InvoicingSubgroupDatabase(
            new BaseDatabase()
        ),
        new ValidateDates()
    )
)

invoicingSubgroupRouter.get('/', invoicingSubgroupController.getInvoicingSubgroup)