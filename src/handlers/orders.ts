import express, { Request, Response,NextFunction } from 'express'
import { Order, OrderList } from '../models/orders'
import jwt from 'jsonwebtoken'
const list = new OrderList()

// handler functions here
const index = async (req: Request, res: Response) => {
    const products = await list.index(req.params.user_id)
    res.json(products)
}
const create = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const user_id = req.params.user_id
        const order: Order = {
            product_id: req.body.product_id,
            quantity: req.body.quantity,
            // @ts-ignore
            user_id: parseInt(user_id),
            status: req.body.status
        }

        const newOrder = await list.create(order)
        res.json(newOrder)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization
        // @ts-ignore
        const token = authorizationHeader.split(' ')[1]
        // @ts-ignore
        const decoded = jwt.verify(token, tokenSecret)


        next()
    } catch (error) {
        res.status(401)
    }
}
const OrderRoutes = (app: express.Application) => {
    // Express routes here
    app.get("/users/:user_id/orders", verifyAuthToken, index)
    app.post("/users/:user_id/orders", verifyAuthToken, create)
}

export default OrderRoutes