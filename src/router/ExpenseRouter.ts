import express from "express"
import { ExpenseController } from "../controller/ExpenseController"
import { ExpenseBusiness } from "../business/ExpenseBusiness"
import { ExpenseDatabase } from "../database/ExpenseDatabase"
import { BaseDatabase } from "../database/BaseDatabase"

export const expenseRouter = express.Router()

const userController = new ExpenseController(
    new ExpenseBusiness(new ExpenseDatabase(new BaseDatabase()))
)

expenseRouter.post('/', userController.getExpense) 