import supertest from 'supertest'
import app from '../server'
import { Product, ProductList } from '../models/products';
import { User, UserList } from '../models/users';
import { Order, OrderList } from '../models/orders'


const product = new ProductList()
const user = new UserList()

const request = supertest(app);
let uid: string
let pid: string
let token: string
describe('test "/orders" endpoint response ', () => {

    beforeAll(async () => {

        // @ts-ignore
        const resultp = await product.create({
            name: 'laptop1',
            price: 100,
            category: 'laptop',
        });
        // @ts-ignore
        const resultu = await user.create({
            firstName: 'chris',
            lastName: 'cho',
            password: '1234',
        });
        pid = resultp.id.toString()
        // @ts-ignore
        uid = resultu.id.toString()

        const response = await request.post('/login')
            .send({
                firstName: "chris",
                lastName: "cho",
                password: "1234"
            })

        token = response.body
        console.log(token)
        expect(200)
        
    })


    it('"/users/:user_id/orders" endpoint should response with status code of 200 //POST', async () => {
        // @ts-ignore
        const order = JSON.stringify({

            product_id: pid as unknown as number,
            quantity: 100,
            status: 'active',
        })

        const response = await request.post(`/users/?user_id=${uid}/orders`).send(order).send(token).set('Authorization', 'Bearer ' + token)
        expect(response.statusCode).toBe(200)
    })


    it('"/users/:user_id/orders" endpoint should response with status code of 200 //GET', async () => {
        const response = await request.get(`/users/?user_id=${uid}/orders`).send(token).set('Authorization', 'Bearer ' + token)
        expect(response.statusCode).toBe(200)
    })






})