import express, { Request, Response } from 'express'
import { Product, ProductList } from '../models/products'

const list = new ProductList()

// handler functions here
const index = async (_req: Request, res: Response) => {
    const products = await list.index()
    res.json(products)
}

const show = async (req: Request, res: Response) => {
    const products = await list.show(req.params.id)
    res.json(products)

}

const create = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category || ''
        }

        const newProduct = await list.create(product)
        res.json(newProduct)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await list.delete(req.body.id)
    res.json(deleted)
} 

const ProductRoutes = (app: express.Application) => {
    // Express routes here
    app.get("/products", index)
    app.get("products/:id", show)
    app.post("/products", create)
    app.delete("/products/:id", destroy)
}

export default ProductRoutes