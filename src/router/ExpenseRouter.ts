import express from "express"
import { ExpenseController } from "../controller/ExpenseController"
import { ExpenseBusiness } from "../business/ExpenseBusiness"
import { ExpenseDatabase } from "../database/ExpenseDatabase"
import { BaseDatabase } from "../database/BaseDatabase"
import { ValidateDates } from "../services/ValidateDates"

export const expenseRouter = express.Router()

const expenseController = new ExpenseController(
    new ExpenseBusiness(
        new ExpenseDatabase(
            new BaseDatabase(),
        ),
        new ValidateDates()
    )
)

expenseRouter.get('/', expenseController.getExpense) 