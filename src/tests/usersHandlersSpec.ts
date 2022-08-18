import supertest from 'supertest'
import app from '../server'
import { User } from '../models/users'


const request = supertest(app);
let token: string
let id: string
describe('test "/users" endpoint response and users/create', () => {

    beforeAll(async () => {

        const response = await request.post('/users')
            .send({
                firstName: "donghyeon",
                lastName: "oh",
                password: "1234"
            })

        token = response.body
        console.log(token)
        expect(200)
    })


    it('"/users" endpoint should response with status code of 200 //GET', async () => {
        const response = await request.get('/users').send(token).set('Authorization', 'Bearer ' + token)
        expect(response.statusCode).toBe(200)
    })


    it('"/users/:id" endpoint should response with status code of 200 //GET', async () => {
        const response = await request.get(`/users/?id=${id}`).send(token).set('Authorization', 'Bearer ' + token)
        expect(response.statusCode).toBe(200)
    })

    it('"/login" endpoint should response with status code of 200 //POST', async () => {
        // @ts-ignore
        const user: User = {
            firstName: "donghyeon",
            lastName: "oh",
            password: "1234"
        }
        const response = await request.post('/login').send(user)
        console.log(user)
        expect(response.statusCode).toBe(200)

    })




})