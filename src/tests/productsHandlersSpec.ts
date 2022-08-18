import supertest from 'supertest'
import app from '../server'
import { Product } from '../models/products'


const request = supertest(app);
let token: string
let id: string
describe('test "/products" endpoint response', () => {
    
    beforeAll(async () => {

        const result_1 = await request.post('/products').send({
            name: "practice",
            price: 200,
            category: "laptop"
        })
        id = result_1.body.id
        await console.log(id)

    })


    it('"/products" endpoint should response with status code of 200 //GET', async () => {
        const response = await request.get('/products')
        expect(response.statusCode).toBe(200)
    })


    it('"/products/:id" endpoint should response with status code of 200 //GET', async () => {
        const response = await request.get(`/products/?id=${id}`)
        console.log(id)
        console.log(response.body)
        expect(response.statusCode).toBe(200)
    })

    it('"/products/create" endpoint should response with status code of 200 //POST', async () => {
        // @ts-ignore
        const product: Product = {
            name: "product1",
            price: 200,
            category: "laptop"
        }
        const response = await request.post('/products').send(product)
        console.log(product)
        expect(response.statusCode).toBe(200)

    })


    it('"/products/:id" endpoint should response with status code of 200 //DELETE', async () => {
        const response = await request.delete(`/products/${id}`)
        expect(response.statusCode).toBe(200)
    })


})