import express from "express"
import { DateController } from "../controller/DateController"
import { DateBusiness } from "../business/DateBusiness"

export const getDateRouter = express.Router()

const userController = new DateController(
    new DateBusiness()
)

getDateRouter.post('/', userController.getDate)