import express from "express"
import { DateController } from "../controller/DateController"
import { DateBusiness } from "../business/DateBusiness"
import { TotalExpensesDatabase } from "../database/TotalExpensesDatabase"
import { BaseDatabase } from "../database/BaseDatabase"

export const getDateRouter = express.Router()

const userController = new DateController(
    new DateBusiness(new TotalExpensesDatabase(new BaseDatabase()))
)

getDateRouter.post('/', userController.getDate)